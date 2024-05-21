import {
  ApiResponse, CheckAccessRequest, CheckAccessResponse
} from "@/models";
import { customFetch } from "./customFetch";

export async function checkAiPayAccess(apiKey: string, request: CheckAccessRequest): Promise<ApiResponse<CheckAccessResponse>> {
  try {
    return await customFetch(apiKey, "/api/access/check", request);
  } catch (error) {
    return {
      error: "Failed to check access",
      debugError: error instanceof Error ? error.message : undefined,
    };
  }
}
