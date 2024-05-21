import {
  ApiResponse,
  RequestAccessRequest,
  RequestAccessResponse
} from "@/models";
import { customFetch } from "./customFetch";

export async function requestAiPayAccess(apiKey: string, request: RequestAccessRequest): Promise<ApiResponse<RequestAccessResponse>> {
  try {
    return await customFetch(apiKey, "/api/access/request", request);
  } catch (error) {
    return {
      error: "Failed to request access",
      debugError: error instanceof Error ? error.message : undefined,
    };
  }
}
