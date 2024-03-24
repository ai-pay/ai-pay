AI Pay has an OpenAI compatible endpoint that allows developers to use the OpenAI sdk to call the AI Pay API. This allows developers to use AI Pay by changing a few lines of code. The OpenAI compatible endpoint also allows for integration with other OpenAI compatible tools.

## How to use the endpoint
The AI Pay OpenAI compatible endpoint can be accessed through the OpenAI client sdk or directly with the API. When initialising the OpenAI sdk set the API key to the current sessionId and change the endpoint to `https://api.joinaipay.com/api/openai-compatible`. The OpenAI sdk can be initialised and used in the frontend as a new secure sessionId is generated each session and invalidated when the user leaves the website.
```typescript
import { AiPayClient } from "ai-pay/client";
import OpenAI from "openai";

const sessionId = AiPayClient.getInstance().getClientSessionId()
if (!sessionId) {
  setError("You need an active session to call the AI Pay APIs.")
  return
}

const client = new OpenAI(
  apiKey: sessionId,
  baseURL: "https://api.joinaipay.com/api/openai-compatible",
  // Safe to call from the front end as a new sessionId is generated each session
  dangerouslyAllowBrowser: true,
)
```

### Compatible tools
The AI Pay OpenAI compatible endpoint allows tools such as [Langchain](https://www.langchain.com) or [LlamaIndex](https://www.llamaindex.ai) to call our service. When using these tools make sure to change th openai_api_base url to `https://api.joinaipay.com/api/openai-compatible` and replace the openai_api_key with the sessionId from the front end.
#### Langchain example
```python
from langchain.chat_models.openai import ChatOpenAI compatible

# Retrieve this from the front end `AiPayClient.getInstance().getClientSessionId()`
sessionId = request.sessionId

openai = ChatOpenAI(
    model_name="your-model-name",
    openai_api_key=sessionId, 
    openai_api_base="https://api.joinaipay.com/api/openai-compatible",
)
```
