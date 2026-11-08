import { AiPayClient, SessionData } from "ai-pay";
import { useEffect, useState } from "react";

// Session hooks from ai-pay/ai-pay-react-hooks, which is no longer published to npm.
export function useSessionData(): SessionData {
  const [session, setSession] = useState<SessionData>({
    sessionState: "UNANSWERED",
    browserExtensionInstalled: false,
  });

  useEffect(() => {
    return AiPayClient
      .getInstance()
      .subscribeToSessionState((session) => setSession({...session}));
  }, [setSession]);

  return session;
}

export function useIsBrowserExtensionInstalled(): boolean {
  const [installed, setInstalled] = useState<boolean>(false);

  useEffect(() => {
    return AiPayClient
      .getInstance()
      .subscribeToSessionState((session) => setInstalled(session.browserExtensionInstalled));
  }, [setInstalled]);

  return installed;
}
