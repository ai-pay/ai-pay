
export const supportedImageModels = [
  "dall-e-3",
  "dall-e-2",
] as const;

export type SupportedImageModel = typeof supportedImageModels[number];

export function isSupportedImageModel(model: string): model is SupportedImageModel {
  return supportedImageModels.includes(model as SupportedImageModel)
}

export type ImageGenerationRequest = {
  prompt: string
  // responseId?: string // TODO: add responseId 
  // (will act as a unique identifier for the response) 
  // if multiple requests are made with the same response id it wont generate a new image and will return the same image
} & ({
  imageModel: "dall-e-2",
  n?: number,
  size: "256x256" | "512x512" | "1024x1024",
} | {
  imageModel: "dall-e-3",
  size: "1024x1024" | "1792x1024" | "1024x1792",
  quality: "standard" | "hd",
  style?: "vivid" | "natural"
});

export type ImageGenerationResponse = {
  imageUrls: string[]
};