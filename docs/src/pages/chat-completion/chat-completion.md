For more information on the OpenAI Chat Completion API, please visit the [official OpenAI documentation](https://platform.openai.com/docs/guides/text-generation)

## Supported Models
- `gpt-3.5-turbo`
- `gpt-3.5-turbo-16k`
- `gpt-4`
- `gpt-4-32k`

Note: If you would like to see other models supported by AI Pay, please submit feedback or reach out the the team at marcus@joinaipay.com.

## Example
```typescript
import { chatCompletion } from "ai-pay/apis"
import { ChatCompletionRequest } from "ai-pay/models";

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

  const {
    error,
    debugError,
    data,
  } = await chatCompletion(request);

  if (error) {
    // Handle the error
  } else {
    // Do something with the data
  }
}
```