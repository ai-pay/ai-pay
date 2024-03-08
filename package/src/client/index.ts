import { SessionData } from "@/models";
import { customEventReceiver } from "../utils/customEventEmitterReceiver";
import { debugLog } from "../methods/debugLogs";
import { getAllDataFromDocument } from "./documentData/getSessionDataFromDocument";

export * from "./documentData"

export type SessionDataChangeCallback = (session: SessionData) => void

export class AiPayClient {
  private constructor() {
    this.getAiPayDataFromDocument();
    this.listenForChangeEvents();
  }

  private static instance: AiPayClient;

  /**
     * Always returns the same instance of AiPayClient or creates a new instance of AiPayClient if it has not been created yet.
     * 
     * @returns {AiPayClient}
     */
  public static getInstance(): AiPayClient {
    if (!AiPayClient.instance) {
      AiPayClient.instance = new AiPayClient();
    }

    return AiPayClient.instance;
  }

  private sessionData: SessionData = {
    sessionState: "UNANSWERED",
    browserExtensionInstalled: false,
  };
  private userChangeSubscriptions: SessionDataChangeCallback[] = [];
  
  private getAiPayDataFromDocument(): void {
    const {
      sessionId,
      browserExtensionInstalled,
    } = getAllDataFromDocument()

    if (sessionId) {
      this.setSessionState({
        sessionState: "ACTIVE",
        browserExtensionInstalled: true,
        sessionId,
      });
    } else if (browserExtensionInstalled) {
      this.setInstalledState(true);
    }
  }
  private listenForChangeEvents(): void {
    customEventReceiver("AI_PAY_SESSION_DATA_CHANGE", (event) => {
      debugLog("AI_PAY_SESSION_DATA_CHANGE received with details: ", event.detail);
      this.setSessionState(event.detail);
    })
    customEventReceiver("AI_PAY_BROWSER_EXTENSION_INSTALLED", () => {
      debugLog("AI_PAY_BROWSER_EXTENSION_INSTALLED event received");
      this.setInstalledState(true);
    })
  }
  private setInstalledState(installed: boolean): void {
    if (this.sessionData.browserExtensionInstalled === installed) {
      return;
    }

    debugLog("Detected AI Pay browser extension is " + (installed ? "installed" : "not installed"));

    this.sessionData.browserExtensionInstalled = installed;
    this.userChangeSubscriptions.forEach(subscription => subscription(this.sessionData));
  }
  private setSessionState(session: SessionData): void {
    if (
      this.sessionData.sessionState === session.sessionState && 
      this.sessionData.sessionId === session.sessionId && 
      this.sessionData.browserExtensionInstalled === session.browserExtensionInstalled
    ) {
      return;
    }

    debugLog("AI_PAY_SESSION_DATA_CHANGE setting session state: ", session);

    this.sessionData = session;
    this.userChangeSubscriptions.forEach(subscription => subscription(session));
  }

  /**
   * Returns the session id if the session is active, otherwise returns undefined.
   * 
   * @returns {string | undefined} Returns the session id if the session is active, otherwise returns undefined.
   */
  public getClientSessionId(): string | undefined {
    if (this.sessionData.sessionState !== "ACTIVE") {
      return undefined;
    }
    return this.sessionData.sessionId;
  }
  
  /**
   * Listen to changes to the AI Pay usage session. Listen for events such as the session starting, ending, or the session id changing.
   * 
   * @param {SessionDataChangeCallback} callback - A callback function to signal a change to the AI Pay usage session.
   * 
   * @returns {() => void} - A function to stop listening to changes to the AI Pay usage session.
   */
  public subscribeToSessionState(callback: SessionDataChangeCallback): () => void {
    callback(this.sessionData);
    this.userChangeSubscriptions.push(callback);

    return () => {
      this.unsubscribeFromSessionState(callback);
    }
  }
  
  /**
   * Stop listening to changes to the AI Pay usage session.
   * 
   * @param {SessionDataChangeCallback} callback - A callback function to signal a change to the AI Pay usage session.
   */
  public unsubscribeFromSessionState(callback: SessionDataChangeCallback): void {
    this.userChangeSubscriptions = this.userChangeSubscriptions.filter(subscription => subscription !== callback);
  }
}