import {
  AiApiResponse, 
  KnowledgeBaseChatRequest, 
  KnowledgeBaseChatResponse, 
  RequestOptions, 
  ServerErrorResponse 
} from "@/models";
import { AiUsageUrl } from "../url";
import { debugError } from "../../methods/debugLogs";
import { sendRequestToServer } from "./sendRequest";
import { streamToJson } from "../../utils/stream/streamToJson";

/**
 * Sends the chat completion stream request to the AI Pay server and streams the response back via the callback function.
 * 
 * The user session is automatically attached to the request.
 * 
 * @param {KnowledgeBaseChatRequest} request - The request to send to the AI Pay server.
 * 
 * @param {RequestOptions} [options=undefined] - Options to send with the request. eg. stubbed, sessionId
 * 
 * 
 * @return {AiApiResponse<KnowledgeBaseChatResponse>} - wrapper for error handling and returning the knowledge base response
 */
export async function knowledgeBaseChat(
  request: KnowledgeBaseChatRequest, 
  options: RequestOptions = {},
): Promise<AiApiResponse<KnowledgeBaseChatResponse>> {
  
  const url = AiUsageUrl() + "/knowledge-base-chat";

  return await sendRequestToServer({
    options,
    url,
    data: request,
    next: handleKnowledgeBaseChatFetchResponse,
  })
}

async function handleKnowledgeBaseChatFetchResponse(fetchResponse: Response): Promise<AiApiResponse<KnowledgeBaseChatResponse>> {
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
    data: jsonBody as KnowledgeBaseChatResponse,
  }
}
