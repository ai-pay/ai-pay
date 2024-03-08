import {
  ChatCompletionRequest, ChatCompletionResponse, ChatCompletionStreamChunk, 
  SupportedChatCompletionMessageParam,
  SupportedChatCompletionModel
} from "../chatCompletion";

/**
 * Request types for the knowledge base chat endpoint
 * 
 * @property knowledgeBaseId - The knowledge base to use for context. 
 * If not provided the knowledge base is the one created on the join ai pay website dashboard
 * 
 * @property systemPromptTemplate - The system prompt template to use for the chat completion request. 
 * Will replace {context} with the data retrieved from the knowledge base.
 * 
 * @property rephraseTemplate - The rephrase template to be used to generate a standalone question to search the knowledge base.
 * 
 * @property rephraseGenerationModel - The model to use for generating a standalone question to search the knowledge base.
 * Defaults to the model specified in the chatCompletionRequest.
 * 
 * @property maxNumberOfContextChunks - The maximum number of context chunks to use for the chat completion request. 
 * More chunks may result in more accurate completions but may also result in higher costs.
 * 
 * @property chatHistory - The chat history for the current conversation.
 * 
 * @property question - The most recent question asked by the user.
 * 
 * @property chatCompletionRequest - The chat completion options to modify the parameters of the chat completion model.
 */
export type KnowledgeBaseChatRequest = {
  knowledgeBaseId?: string;

  systemPromptTemplate?: `${string}{context}${string}`;

  rephraseTemplate?: `${string}{chat_history}${string}{question}${string}`;

  rephraseGenerationModel?: SupportedChatCompletionModel

  maxNumberOfContextChunks?: number;

  chatHistory: Array<SupportedChatCompletionMessageParam>

  question: string;
  
  chatCompletionRequest: Omit<ChatCompletionRequest, "messages">
};

export type KnowledgeBaseChatResponse = ChatCompletionResponse

export type KnowledgeBaseChatStreamChunk = ChatCompletionStreamChunk