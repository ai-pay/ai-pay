import {
  ChatCompletion, ChatCompletionAssistantMessageParam, ChatCompletionChunk, ChatCompletionCreateParamsBase, 
  ChatCompletionSystemMessageParam,
  ChatCompletionUserMessageParam
} from "openai/resources/chat/completions";

export const supportedChatCompletionModels = [
  "gpt-3.5-turbo",
  "gpt-3.5-turbo-16k",
  "gpt-4",
  "gpt-4-32k",
  "gpt-4-turbo-preview",
] as const 

export type SupportedChatCompletionModel = typeof supportedChatCompletionModels[number];

export function isSupportedChatCompletionModel(model: string): model is SupportedChatCompletionModel {
  return supportedChatCompletionModels.includes(model as SupportedChatCompletionModel)
}

export declare type CreateChatCompletionRequestStop = Array<string> | string;

export type SupportedChatCompletionMessageParam = ChatCompletionSystemMessageParam
| ChatCompletionUserMessageParam
| Omit<ChatCompletionAssistantMessageParam, "function_call" | "tool_calls">

export type ChatCompletionRequest = Omit<ChatCompletionCreateParamsBase, "stream" | "function_call" | "functions" | "tool_choice" | "tools" | "user" | "messages"> & {
  model: SupportedChatCompletionModel
  messages: Array<SupportedChatCompletionMessageParam>
}

export interface ChatCompletionResponse {
  choices: Array<ChatCompletion.Choice>;
}

export interface ChatCompletionStreamChunk {
  choices: Array<ChatCompletionChunk.Choice>;
}

