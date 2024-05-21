## AI Pay
AI Pay is a safer and a better UX alternative to requesting AI API keys from your users. 

### How It Works
1. Call the "Request access" AI Pay endpoint. This endpoint will return a url to the users AI Pay portal where they can accept to decline access to your application.
2. If the user accepts access, you will be able to call any of the supported AI APIs with `[your api key]:[their uid]` as the API key. If you need an AI API that isn't supported, please let us know and we will add it.

### Supported AI APIs
- OpenAI Chat Completion
- OpenAI Image Generation
- OpenAI Embeddings
NOTE: `We will be adding AI APIs on a per request basis. Please let me know if you need an AI API that isn't supported. I will personally add it for you. You can reach me at marcus@joinaipay.com`
