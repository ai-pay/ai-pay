import {
  AiApiResponse, ChatCompletionRequest, ChatCompletionResponse
  , RequestOptions, ServerErrorResponse 
} from "@/models";
import { AiUsageUrl } from "../url";
import { debugError } from "@/methods/debugLogs";
import { sendRequestToServer } from "./sendRequest";
import { streamToJson } from "../../utils/stream/streamToJson";

/**
 * Sends the chat completion request to the AI Pay server and returns the response.
 * 
 * The user session is automatically attached to the request.
 * 
 * @param {ChatCompletionRequest} request - The request to send to the AI Pay server.
 * 
 * @param {RequestOptions} [options=undefined] - Options to send with the request. eg. stubbed, sessionId
 * 
 * 
 * @return {AiApiResponse<ChatCompletionResponse>} - wrapper for error handling and returning the chat completion response
 */

export async function chatCompletion(
  request: ChatCompletionRequest, 
  options: RequestOptions = {},
): Promise<AiApiResponse<ChatCompletionResponse>> {
  const url = AiUsageUrl() + "/chat-completion";

  return await sendRequestToServer({
    options,
    url,
    data: request,
    next: handleChatCompletionFetchResponse,
  })
}

async function handleChatCompletionFetchResponse(fetchResponse: Response): Promise<AiApiResponse<ChatCompletionResponse>> {
  if (fetchResponse.body === null) {
    debugError("chatCompletionStream returned without a body", fetchResponse.status, fetchResponse)

    return {
      error: "Invalid response from the server",
    }
  }

  const jsonBody = await streamToJson(fetchResponse.body)

  if (fetchResponse.status !== 200) {
    debugError("chatCompletion failed with non 200 status", fetchResponse.status, fetchResponse)
    
    const body = jsonBody as ServerErrorResponse 
    return {
      error: body.error ?? "Internal server error",
      debugError: (body.debugError ?? "") + ". failed with non 200 status code",
    }
  }

  return {
    data: jsonBody as ChatCompletionResponse,
  }
}