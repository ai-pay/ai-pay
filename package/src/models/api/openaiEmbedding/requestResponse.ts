
export const supportedEmbeddingModels = [
  "text-embedding-3-small",
  "text-embedding-3-large",
] as const 

export type SupportedEmbeddingModel = typeof supportedEmbeddingModels[number];

export function isSupportedEmbeddingModel(model: string): model is SupportedEmbeddingModel {
  return supportedEmbeddingModels.includes(model as SupportedEmbeddingModel)
}

export type EmbeddingsRequest = {
  model: SupportedEmbeddingModel
  inputs: Array<string>
  dimensions?: number
  encoding_format?: "float" | "base64";
}

export interface EmbeddingsResponse {
  embeddings: Array<Array<number>>;
}
