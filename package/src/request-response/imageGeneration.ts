import { ApiErrorWrapper } from "./common/apiErrorWrapper";
import { z } from "zod";

export const stabilityUltraRequestSchema = z.object({
  model: z.literal("stability-image-ultra"),
  prompt: z.string().max(10000),
  aspect_ratio: z.enum(["16:9", "1:1", "21:9", "2:3", "3:2", "4:5", "5:4", "9:16", "9:21"]).optional(),
  negative_prompt: z.string().max(10000).optional(),
  seed: z.number().min(0).max(4294967294).optional(),
});
export type StabilityUltraRequest = z.infer<typeof stabilityUltraRequestSchema>;

export const stabilityCoreRequestSchema = z.object({
  model: z.literal("stability-image-core"),
  prompt: z.string().max(10000),
  aspect_ratio: z.enum(["16:9", "1:1", "21:9", "2:3", "3:2", "4:5", "5:4", "9:16", "9:21"]).optional(),
  negative_prompt: z.string().max(10000).optional(),
  seed: z.number().min(0).max(4294967294).optional(),
  style_preset: z.enum(["3d-model", "analog-film", "anime", "cinematic", "comic-book", "digital-art", "enhance", "fantasy-art", "isometric", "line-art", "low-poly", "modeling-compound", "neon-punk", "origami", "photographic", "pixel-art", "tile-texture"]),
});
export type StabilityCoreRequest = z.infer<typeof stabilityCoreRequestSchema>;

export const stabilitySd3RequestSchema = z.object({
  model: z.enum(["stability-sd3", "stability-sd3-turbo"]),
  prompt: z.string().max(10000),
  aspect_ratio: z.enum(["16:9", "1:1", "21:9", "2:3", "3:2", "4:5", "5:4", "9:16", "9:21"]).optional(),
  negative_prompt: z.string().max(10000).optional(),
  seed: z.number().min(0).max(4294967294).optional(),
});
export type StabilitySd3Request = z.infer<typeof stabilitySd3RequestSchema>;

export const dallE2RequestSchema = z.object({
  model: z.literal("openai-dall-e-2"),
  prompt: z.string().max(1000),
  n: z.number().min(1).max(10).optional(),
  response_format: z.enum(["url", "b64_json"]),
  size: z.enum(["256x256", "512x512", "1024x1024"]),
});
export type DallE2Request = z.infer<typeof dallE2RequestSchema>;

export const dallE3RequestSchema = z.object({
  model: z.literal("openai-dall-e-3"),
  prompt: z.string().max(4000),
  quality: z.enum(["standard", "hd"]),
  response_format: z.enum(["url", "b64_json"]),
  size: z.enum(["1024x1024", "1792x1024", "1024x1792"]),
  style: z.enum(["vivid", "natural"]),
});
export type DallE3Request = z.infer<typeof dallE3RequestSchema>;

export const imageGenerationRequestSchema = z.object({
  userId: z.string(),
  modelDetails: z.union([
    stabilityUltraRequestSchema,
    stabilityCoreRequestSchema,
    stabilitySd3RequestSchema,
    dallE2RequestSchema,
    dallE3RequestSchema,
  ]),
});

export type ImageGenerationRequest = z.infer<typeof imageGenerationRequestSchema>;

export type ImageGenerationResponse = ApiErrorWrapper<{
  imageUrl: string;
  seed?: string;
  revisedPrompt?: string;
} | {
  base64Image: string;
  seed?: string;
  revisedPrompt?: string;
} | {
  imageUrls: string[];
} | {
  base64Images: string[];
}>
