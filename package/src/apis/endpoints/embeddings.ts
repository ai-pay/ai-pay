import {
  AiApiResponse, EmbeddingsRequest, EmbeddingsResponse, 
  RequestOptions, 
  ServerErrorResponse
} from "@/models";
import { AiUsageUrl } from "../url";
import { debugError } from "../../methods/debugLogs";
import { sendRequestToServer } from "./sendRequest";
import { streamToJson } from "../../utils/stream/streamToJson";

/**
 * OpenAI Embeddings API
 * 
 * The user session is automatically attached to the request.
 * 
 * @param {EmbeddingsRequest} request - The request to send to the AI Pay server.
 * 
 * @param {RequestOptions} [options=undefined] - Options to send with the request. eg. stubbed, sessionId
 * 
 * 
 * @return {AiApiResponse<EmbeddingsResponse>} - Wrapper for error handling and returning the chat completion response
 */

export async function embeddings(
  request: EmbeddingsRequest, 
  options: RequestOptions = {},
): Promise<AiApiResponse<EmbeddingsResponse>> {

  const url = AiUsageUrl() + "/openai-embeddings";
  
  return await sendRequestToServer({
    options,
    url,
    data: request,
    next: handleEmbeddingFetchResponse,
  })
}

async function handleEmbeddingFetchResponse(fetchResponse: Response): Promise<AiApiResponse<EmbeddingsResponse>> {
  if (fetchResponse.body === null) {
    debugError("chatCompletionStream returned without a body", fetchResponse.status, fetchResponse)

    return {
      error: "Invalid response from the server",
      debugError: "OpenAiEmbeddingFetch returned without a body",
    }
  }
  
  let jsonBody: unknown
  
  try {
    jsonBody = await streamToJson(fetchResponse.body)
  } catch (error) {
    debugError("chatCompletion failed to parse JSON", error, fetchResponse)
    
    return {
      error: "Internal server error",
      debugError: "failed to parse JSON",
    }
  }
  
  if (fetchResponse.status !== 200) {
    debugError("chatCompletion failed with non 200 status", fetchResponse.status, fetchResponse)
    
    const body = jsonBody as ServerErrorResponse
    return {
      error: body.error ?? "Internal server error",
      debugError: (body.debugError ?? "") + ". failed with non 200 status code",
    }
  }

  return {
    data: jsonBody as EmbeddingsResponse,
  }
}