# AI PAY
AI Pay is a tool that allows website developers to use AI APIs (Chat GPT, image generation etc.) and easily pass on the cost to the users.

#### How it works
When a user with the AI Pay browser extension visits your website they are notified that your website wants to use AI Pay. The user has the option to specify a budget and start a session. If the user starts the session the website can use any of the supported AI APIs until the session budget runs out. The session can be stopped at any time by the user and automatically stops when the user exits your website.

#### How AI Pay benefits website developers
- Implement AI without having to handle users, payments, costs or a backend.
- Less than 10 minute setup.
- Monetise your website.

#### Why AI Pay benefits the users of your website
- AI Pay enables AI products or features that currently aren't economically viable.
- Single point of payment for a user.
- Anonymous payment for AI products.

## Usage
1. Run ```npm install ai-pay``` or ```yarn add ai-pay```
2. Visit [AI Pay website dashboard](https://www.joinaipay.com/dashboard/newwebsite) and sign up your website (~2 minutes). 
3. Copy the meta tag from the AI Pay website dashboard into the header of your website. The meta tag should be copied from the dashboard and will look something like this.
```html
<meta 
    name="ai-pay-website-identifier" 
    content='{"websiteId":"{...}","websiteName":"{...}","websiteDescription":"{...}","recommendedCredit":{...},"requestUsageOnPageLoad":{...}}'
>
```
4. Listen for AI Pay session changes. AI Pay API requests will only succeed if there is an active session.
```typescript
import { AiPayClient } from "ai-pay/client"
import { SessionData } from "ai-pay/models";
 
// getInstance always returns the same AiPayClient class
const client = AiPayClient.getInstance()
 
const sessionCallback = (session: SessionData) => {
  const isActiveSession = session.sessionState === "ACTIVE"
 
  if (isActiveSession) {
    // Can make any AI Pay API request
    return
  }
 
  if (session.browserExtensionInstalled) {
    // Prompt the user to start a session
    return
  }
 
  // Prompt the user to download the AI Pay browser extension
}
 
client.subscribeToSessionState(sessionCallback)

 // When your are finished using the session state
client.unsubscribeFromSessionState(sessionCallback)
```
5. Call one of the AI APIs
```typescript
import {
    AiPayClient, 
    ChatCompletionRequest,
    chatCompletionStream,
    ChatCompletionStreamResponse,
} from "ai-pay"

if (AiPayClient.getInstance().getClientSessionId()) {
    const chatCompletionRequest: ChatCompletionRequest = {
        model: "gpt-3.5-turbo"
        messages: [{
            role: "user",
            content: "Tell me a joke about programmers"
        }]
    }

    let response = ""

    const { error } = await chatCompletionStream(
        chatCompletionRequest, 
        (chunk: ChatCompletionStreamResponse) => {
            // Update UI with a streamed response
            response += chunk.choices[0].delta?.content ?? ""
        }
    )

    if (error) {
        console.error(error)
    } else {
        console.log(response)
    }
}
```
