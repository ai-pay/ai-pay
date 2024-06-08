import { ApiErrorWrapper } from "./common/apiErrorWrapper";
import { z } from "zod";

export const stabilityUltraRequestSchema = z.object({
  model: z.literal("stability-image-ultra"),
  prompt: z.string().max(10000),
  aspectRatio: z.enum(["16:9", "1:1", "21:9", "2:3", "3:2", "4:5", "5:4", "9:16", "9:21"]).optional(),
  negativePrompt: z.string().max(10000).optional(),
  seed: z.number().min(0).max(4294967294).optional(),
});

export const stabilityCoreRequestSchema = z.object({
  model: z.literal("stability-image-core"),
  prompt: z.string().max(10000),
  aspectRatio: z.enum(["16:9", "1:1", "21:9", "2:3", "3:2", "4:5", "5:4", "9:16", "9:21"]).optional(),
  negativePrompt: z.string().max(10000).optional(),
  seed: z.number().min(0).max(4294967294).optional(),
  style: z.enum(["3d-model", "analog-film", "anime", "cinematic", "comic-book", "digital-art", "enhance", "fantasy-art", "isometric", "line-art", "low-poly", "modeling-compound", "neon-punk", "origami", "photographic", "pixel-art", "tile-texture"]),
});

export const stabilitySd3RequestSchema = z.object({
  model: z.enum(["stability-sd3", "stability-sd3-turbo"]),
  prompt: z.string().max(10000),
  aspectRatio: z.enum(["16:9", "1:1", "21:9", "2:3", "3:2", "4:5", "5:4", "9:16", "9:21"]).optional(),
  negativePrompt: z.string().max(10000).optional(),
  seed: z.number().min(0).max(4294967294).optional(),
});

export const dallE2RequestSchema = z.object({
  model: z.literal("openai-dall-e-2"),
  prompt: z.string().max(1000),
  n: z.number().min(1).max(10).optional(),
  response_format: z.enum(["url", "b64_json"]).optional(),
  size: z.enum(["256x256", "512x512", "1024x1024"]).optional(),
});

export const dallE3RequestSchema = z.object({
  model: z.literal("openai-dall-e-3"),
  prompt: z.string().max(4000),
  quality: z.enum(["standard", "hd"]).optional(),
  response_format: z.enum(["url", "b64_json"]).optional(),
  size: z.enum(["1024x1024", "1792x1024", "1024x1792"]).optional(),
  style: z.enum(["vivid", "natural"]).optional(),
});

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
  seed: string;
} | {
  base64Image: string;
  seed: string;
} | {
  imageUrls: string[];
}>
