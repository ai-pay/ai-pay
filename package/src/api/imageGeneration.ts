import { ImageGenerationRequest } from "@/models";
import { typedFetch } from "./fetch";

export function imageGeneration(
  apiKey: string,
  request: ImageGenerationRequest,
) {
  return typedFetch(apiKey, request, "/ai/image-generation");
}
