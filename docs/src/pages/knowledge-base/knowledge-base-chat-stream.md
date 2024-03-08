
Chat with the knowledge base to get specific answers about a particular topic.

The knowledge base stream will stream the response, allowing for a chat gpt like experience.

## Example
```typescript 
import { 
  KnowledgeBaseChatRequest, KnowledgeBaseChatStreamChunk 
} from "ai-pay/models"
import { knowledgeBaseChatStream } from "ai-pay/apis"

const request: KnowledgeBaseChatRequest = {
  chatHistory: [
    // the chat history not including the most recent question
  ],
  question: "What is some specific information about your company",
  chatCompletionRequest: {
    model: "gpt-3.5-turbo",
  }
}

let textResponse = ""

const callBack = (response: KnowledgeBaseChatStreamChunk) => {
  // update the UI with the streamed response
  textResponse += response?.choices[0]?.delta?.content ?? "";
}

const {
  error,
  debugError,
} = await knowledgeBaseChatStream(
  request,
  callBack
);

if (error) {
  // Handle the error
} else {
  // Should have finished processing all chunks
  console.log("Text response: ", textResponse)
}
```