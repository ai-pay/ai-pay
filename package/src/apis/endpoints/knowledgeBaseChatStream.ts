
import {
  AiApiResponse, KnowledgeBaseChatRequest, KnowledgeBaseChatStreamChunk, RequestOptions, ServerErrorResponse
} from "@/models";
import { AiUsageUrl } from "../url";
import { debugError } from "../../methods/debugLogs";
import { getFirstChunk } from "../../utils/stream/getFirstChunk";
import { getIterableStream } from "../../utils/stream/getIterableStream";
import { sendRequestToServer } from "./sendRequest";

/**
 * Sends the chat completion stream request to the AI Pay server and streams the response back via the callback function.
 * 
 * The user session is automatically attached to the request.
 * 
 * @param {ChatCompletionRequest} request - The request to send to the AI Pay server.
 * 
 * @param {(response: KnowledgeBaseChatStreamChunk): void} callback - The callback function to stream chunks of the response. 
 * 
 * @param {RequestOptions} [options=undefined] - Options to send with the request. eg. stubbed, sessionId
 * 
 * @returns {AiApiResponse<object>} - Wrapper for error handling
*/
export async function knowledgeBaseChatStream(
  request: KnowledgeBaseChatRequest, 
  callback: (response: KnowledgeBaseChatStreamChunk) => void, 
  options: RequestOptions = {},
): Promise<AiApiResponse<object>> {
    
  const url = AiUsageUrl() + "/knowledge-base-chat-stream";
    
  return await sendRequestToServer({
    options,
    url,
    data: request,
    next: handleChatCompletionStreamFetchResponse(callback),
  })
}
  
type CallbackType = (response: KnowledgeBaseChatStreamChunk) => void
function handleChatCompletionStreamFetchResponse(callback: CallbackType): (fetchResponse: Response) => Promise<AiApiResponse<object>> {
    
  return async (fetchResponse: Response) => {
    if (fetchResponse.body === null) {
      debugError("chatCompletionStream returned without a body", fetchResponse.status, fetchResponse)
    
      return {
        error: "Invalid response from the server",
      }
    }
      
    const stream = await getIterableStream<KnowledgeBaseChatStreamChunk>(fetchResponse.body)
    
    if (fetchResponse.status !== 200) {
      const firstChunk = await getFirstChunk(stream) as ServerErrorResponse 
    
      debugError("chatCompletionStream failed with non 200 status", fetchResponse.status, firstChunk ?? fetchResponse)
        
      return {
        error: firstChunk.error ?? "Internal server error",
        debugError: firstChunk.debugError ??  "failed with non 200 status code",
      }
    }
    
    for await (const chunk of stream) {
      if (chunk.type === "error") {
        debugError("chatCompletionStream failed with error chunk", chunk)
        return {
          error: chunk.errorMessage,
        }
      }
      callback(chunk);
    }
    
    return {
      data: {},
    }
  }
}