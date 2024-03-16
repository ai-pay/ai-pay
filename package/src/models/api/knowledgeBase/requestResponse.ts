import { 
  SupportedChatCompletionMessageParam,
  SupportedChatCompletionModel
} from "../chatCompletion";

/**
 * Request types for the knowledge base chat endpoint
 * 
 * @property responseGenerationModel - The model to use for generating the response to the user.
 * 
 * @property rephraseGenerationModel - The model to use for generating a standalone question to search the knowledge base.
 * Defaults to the the responseGenerationModel.
 * 
 * @property chatHistory - The chat history for the current conversation.
 * 
 * @property question - The most recent question asked by the user.
 * 
 * @property maxNumberOfContextChunks - The maximum number of context chunks to use for the chat completion request. 
 * More chunks may result in more accurate completions but may also result in higher costs.
 * 
 * @property retrievalThreshold - Context chunks must have a retrieval score above this threshold to be used in the completion.
 */
export type KnowledgeBaseChatRequest = {
  responseGenerationModel: SupportedChatCompletionModel
  rephraseGenerationModel?: SupportedChatCompletionModel
  
  chatHistory: Array<SupportedChatCompletionMessageParam>
  question: string;
  
  maxNumberOfContextChunks?: number;
  retrievalThreshold?: number;
};

export type KnowledgeBaseSource = {
  url: string
  title: string
}
export interface KnowledgeBaseChatResponse {
  response: string;
  sources: KnowledgeBaseSource[] 
}

export type KnowledgeBaseChatStreamChunk = {
  type: "text";
  textChunk: string;
} | {
  type: "sources";
  sources: KnowledgeBaseSource[];
} | {
  type: "progress";
  message: string;
} | {
  type: "error";
  errorMessage: string;
} | {
  type: "debug";
  debugMessage: string;
}
