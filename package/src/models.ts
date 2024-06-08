
import {
  CheckAccessRequest, CheckAccessResponse, checkAccessRequestSchema
} from "./request-response/checkAccess";
import {
  ImageGenerationRequest, ImageGenerationResponse, imageGenerationRequestSchema
} from "./request-response/imageGeneration";
import z from "zod";

export type PathToObjectMapper = {
  "/check-access": {
    request: CheckAccessRequest;
    response: CheckAccessResponse;
  },
  "/ai/image-generation": {
    request: ImageGenerationRequest;
    response: ImageGenerationResponse;
  },
};

export type UrlPath = keyof PathToObjectMapper;

type PathToSchema = {
  [K in UrlPath]: z.ZodType<PathToObjectMapper[K]["request"]>;
}

export const pathToSchema: PathToSchema = {
  "/check-access": checkAccessRequestSchema,
  "/ai/image-generation": imageGenerationRequestSchema,
};

export * from "./request-response/checkAccess";

export * from "./request-response/imageGeneration";

export * from "./request-response/common/apiErrorWrapper";
