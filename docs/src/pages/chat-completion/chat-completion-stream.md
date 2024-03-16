For more information on the Chat Completion API, please visit the [official OpenAI documentation](https://platform.openai.com/docs/guides/text-generation)

## Supported Models
- `gpt-3.5-turbo`
- `gpt-3.5-turbo-16k`
- `gpt-4`
- `gpt-4-32k`
- `gpt-4-turbo-preview`

Note: If you would like to see other models supported by AI Pay, please submit feedback or reach out the the team at marcus@joinaipay.com.

## Example
```typescript
import { chatCompletionStream } from "ai-pay/apis"
import { 
  ChatCompletionRequest,
  ChatCompletionStreamChunk,
} from "ai-pay/models";

async function callChatCompletion() {  
  const request: ChatCompletionRequest = {
    model: "gpt-3.5-turbo",
    temperature: 0.9,
    messages: [
      {
        role: "system",
        content: "Tell me facts in rhymes",
      },
      {
        role: "user",
        content: "Tell me a random fact about the universe.",
      },
    ],
  }

  let textResponse = ""

  const callBack = (response: ChatCompletionStreamChunk) => {
    // update the UI with the streamed response
    textResponse += response?.choices[0]?.delta?.content ?? "";
  }

  const {
    error,
    debugError,
  } = await chatCompletionStream(
    request,
    callBack
  );

  if (error) {
    // Handle the error
  } else {
    // Should have finished processing all chunks
    console.log("Text response: ", textResponse)
  }
}
```