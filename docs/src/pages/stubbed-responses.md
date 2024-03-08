To Reduce the cost when testing you can specify to stub the response from the AI Pay APIs.

All AI Pay APIs have a field to stub the response. 

When you stub the response, the AI Pay servers will still rate limit the request, validate that the session is active and check that there is remaining session budget. If the validation passes a stubbed response is returned. Returning a stubbed response does not cost any credits.

## Example
```typescript filename="Front End"
import { 
  chatCompletion, // Replace with any AI Pay API request
} from "ai-pay/apis"
import { ChatCompletionRequest } from "ai-pay/models";

async function callChatCompletion() {  
  // Specify whether to stub the response or not
  const stubTheResponse = true;

  const request: ChatCompletionRequest = {
    ...
  }

  const options: RequestOptions = {
    stubbed: stubTheResponse
  }

  const response = await chatCompletion(
    request,
    options,
  );

  // Do something with the response
}
```