import { SessionIdGetter } from "@/utils/sessionIdGetter"

export * from "./chatCompletion"
export * from "./openaiEmbedding/requestResponse"
export * from "./knowledgeBase/requestResponse"
export * from "./imageGeneration/requestResponse"

// export interface ApiToRequestType {
//   "https://www.joinaipay.com/api/ai-usage/chat-completion-stream": AiApiResponse<ChatCompletionInput>;
//   "https://www.joinaipay.com/api/ai-usage/chat-completion": ChatCompletionInput;
// }

export type AiApiRequest<T> = {
  sessionId: string
  stubbed?: boolean
  requestData: T
}

export type AiApiResponse<T> = {
  error: string
  debugError?: string
  data?: undefined
} | {
  error?: undefined
  debugError?: undefined
  data: T
}

export type ServerErrorResponse = {
  error: string
  debugError?: string
}

/**
 * Options for the request to the AI Pay server.
 * 
 * @param {boolean} [stubbed=false] - Stub the backend function.
 * If true the backend will run session valid checks and return a stubbed response.
 * 
 * @param {SessionIdGetter} [sessionIdGetter=undefined] - A function that returns the session id.
 * Defaults to the session id provided from the AiPayClient instance.
 */
export interface RequestOptions {
  stubbed?: boolean
  sessionId?: SessionIdGetter
}