import {
  AiApiRequest, AiApiResponse, RequestOptions 
} from "@/models";
import { AiPayClient } from "@/client";
import { debugError } from "@/methods/debugLogs";

interface Props<T, R> {
  options: RequestOptions;
  url: string;
  data: T;
  next: (fetchResponse: Response) => Promise<AiApiResponse<R>>
}

export async function sendRequestToServer<T, R>({
  options,
  url,
  data,
  next,
}: Props<T, R>): Promise<AiApiResponse<R>> {
  let sessionId: string | undefined
  if (!options.sessionId) {
    sessionId = AiPayClient.getInstance().getClientSessionId()
  } else if (typeof options.sessionId === "string") {
    sessionId = options.sessionId
  } else {
    sessionId = options.sessionId();
  }

  if (!sessionId) {
    debugError("chatCompletionStream failed with no session Id. Make sure the AI Pay browser extension shows an active session. For more information go to the documentation https://www.joinaipay.com/docs")

    return {
      error: "No session id provided. Make sure the AI Pay browser extension shows an active session. For more information go to the documentation https://www.joinaipay.com/docs",
    }
  }

  const body: AiApiRequest<T> = {
    sessionId,
    stubbed: options.stubbed,
    requestData: data,
  }

  const fetchRequestContent: RequestInit = {
    method: "POST",
    mode: "cors",
    headers: {
      "session-id": sessionId,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  try {
    return next(await fetch(url, fetchRequestContent))
  } catch (error) {
    return {
      error: "Failed to send the request to the server",
      debugError: String(error),
    }
  }

}