
Chat with the knowledge base to get specific answers about a particular topic.

The knowledge base stream will stream the response, allowing for a chat gpt like experience.

## Example
```typescript 
import { 
  KnowledgeBaseChatRequest, KnowledgeBaseChatStreamChunk 
} from "ai-pay/models"
import { knowledgeBaseChatStream } from "ai-pay/apis"

export async function askQuestion(
  question: string,
  chatHistory: SupportedChatCompletionMessageParam[]
) {
  const request: KnowledgeBaseChatRequest = {
    responseGenerationModel: "gpt-3.5-turbo",
    chatHistory,
    question,
  }

  let streamResponse = ""

  const {
    error,
    debugError,
  } = await knowledgeBaseChatStream(
    request,
    (chunk) => {
      if (chunk.type === "text") {
        streamResponse += chunk.textChunk
        updateUiWithStreamText(streamResponse)
      } 
      else if (chunk.type === "sources") {
        updateUiWithSources(chunk.sources)
      }
      else if (chunk.type === "progress") {
        setProgressUpdate(chunk.message)
      }
    },
  )

  if (error) {
    // Handle the error
  } else {
    // Should have finished processing all chunks
    console.log("Text response: ", streamResponse)
  }
}
```