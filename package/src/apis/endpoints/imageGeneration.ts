
import {
  AiApiResponse, ImageGenerationRequest, ImageGenerationResponse, RequestOptions, ServerErrorResponse 
} from "@/models";
import { AiUsageUrl } from "../url";
import { debugError } from "@/methods/debugLogs";
import { sendRequestToServer } from "./sendRequest";
import { streamToJson } from "@/utils/stream/streamToJson";

/**
 * Sends a image generation request to the AI Pay servers.
 * 
 * @param {ImageGenerationRequest} request - The request to send to the AI Pay server.
 * 
 * @param {RequestOptions} [options={}] - Options to send with the request. eg. stubbed, sessionId
 * 
 * @returns {AiApiResponse<ImageGenerationResponse>} - Wrapper for error handling and response data
 */
export async function imageGeneration<T extends ImageGenerationRequest>(
  request: T, 
  options: RequestOptions = {},
): Promise<AiApiResponse<ImageGenerationResponse>> {
  const url = AiUsageUrl() + "/image-generation";

  return await sendRequestToServer({
    options,
    url,
    data: request,
    next: handleImageGenerationFetchRequest,
  })
}

async function handleImageGenerationFetchRequest(fetchResponse: Response): Promise<AiApiResponse<ImageGenerationResponse>> {
  if (fetchResponse.body === null) {
    debugError("imageGeneration returned without a body", fetchResponse.status, fetchResponse)
  
    return {
      error: "Invalid response from the server",
    }
  }

  const jsonBody = await streamToJson(fetchResponse.body)
  
  if (fetchResponse.status !== 200) {
    debugError("chatCompletion failed with non 200 status", fetchResponse.status, fetchResponse)
      
    const body = jsonBody as Partial<ServerErrorResponse>
    return {
      error: body.error ?? "Unknown internal server error",
      debugError: (body.debugError ?? "") + " Failed with non 200 status code",
    }
  }
  
  return {
    data: jsonBody as ImageGenerationResponse,
  }
}