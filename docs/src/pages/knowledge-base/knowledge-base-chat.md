Chat with the knowledge base to get specific answers about a particular topic.

The knowledge base chat allows you to build a advanced chatbot that can answer questions about a specific topic. 

## Example
```typescript 
import { 
  KnowledgeBaseChatRequest 
} from "ai-pay/models"
import { knowledgeBaseChat } from "ai-pay/apis"

const request: KnowledgeBaseChatRequest = {
  chatHistory: [
    // the chat history not including the most recent question
  ],
  question: "What is some specific information about your company",
  chatCompletionRequest: {
    model: "gpt-3.5-turbo",
  }
}

const {
  error,
  debugError,
  data,
} = await knowledgeBaseChat(request);

if (error) {
  // Handle the error
} else {
  // Do something with the data    
}
```