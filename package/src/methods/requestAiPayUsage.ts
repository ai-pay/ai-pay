import { SessionRequestData } from "@/models";
import { customEventEmitter } from "../utils/customEventEmitterReceiver";
import { debugLog } from "./debugLogs";

/**
 * Sends a request to the user's browser extension (if it is installed) to start a new AI Pay session.
 * 
 * No callback function is provided. Listen for responses via the AiPayClient's subscribeToUserState class method
 * 
 * This request does not guarantee that a new session will be started.
 * 
 * @param {SessionRequestData} data - This request sent to the user's browser extension.
 * 
 * @returns {void}
 */
export function requestAiPayUsage(data: SessionRequestData = {
  requestType: "START_SESSION",
}): void {
  debugLog("requestAiPayUsage called");

  customEventEmitter("AI_PAY_START_SESSION_REQUEST", data)
}