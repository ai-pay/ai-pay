
export const supportedImageModels = [
  "dall-e-3",
  "dall-e-2",
  "stability-ai-core",
] as const;

export type SupportedImageModel = typeof supportedImageModels[number];

export function isSupportedImageModel(model: string): model is SupportedImageModel {
  return supportedImageModels.includes(model as SupportedImageModel)
}

export type ImageGenerationRequest = {
  prompt: string,
} & ({
  imageModel: "dall-e-2",
  n?: number,
  size: "256x256" | "512x512" | "1024x1024",
} | {
  imageModel: "dall-e-3",
  size: "1024x1024" | "1792x1024" | "1024x1792",
  quality: "standard" | "hd",
  style?: "vivid" | "natural"
} | {
  imageModel: "stability-ai-core",
  aspect_ratio?: "16:9" | "1:1" | "21:9" | "2:3" | "3:2" | "4:5" | "5:4" | "9:16" | "9:21",
  negative_prompt?: string,
  seed?: number,
  output_format?: "png" | "jpeg" | "webp",
});

export type ImageGenerationResponse = ImageGenerationUrlResponse | ImageGenerationBufferResponse;

export type ImageGenerationUrlResponse = {
  imageUrl: string
};

export type ImageGenerationBufferResponse = {
  image: string
}