
## Setup the knowledge base
Follow the [knowledge base getting started guide](/knowledge-base/getting-started) to create a knowledge base for the documentation. 

## Website identifying meta tag
Follow the [meta tag installation guide](/getting-started/installation) to sign up your website and get a meta tag. Copy and paste the meta tag into the Metadata of your website. The meta tag is used to identify your website and link the website to your knowledge base.

```typescript
import { Metadata } from "next";

export const metadata: Metadata = {
  other: {
    "ai-pay-website-identifier": '{"websiteId":"{...}","websiteName":"{...}","websiteDescription":"{...}","recommendedCredit":{...},"requestUsageOnPageLoad":{...}}',
  },
}
```

## Chat configuration
The chat configuration is used to customize the chat window. The chat configuration is used to set the color mode, initial assistant question, and default questions.

```typescript
import { ChatConfig } from "@ai-pay/ask-ai";
import { useEffect, useState } from "react";
import { useTheme } from "nextra-theme-docs";

export function useAskAiChatConfig(): ChatConfig | undefined{
  const {
    resolvedTheme, 
  } = useTheme()

  const [chatConfig, setChatConfig] = useState<ChatConfig>()

  useEffect(() => {
    setChatConfig({
      colorMode: (resolvedTheme ?? "auto") as "light" | "dark" | "auto",
      initialAssistantQuestion: "I'm here to answer any questions about the AI Pay documentation. How may I help you?",
      defaultQuestions: [
        "How to get started with AI Pay?",
        "What are the benefits of using AI Pay?",
        "How to integrate AI Pay with my application?",
        "What is AI Pay?",
        "Can I use AI Pay with Langchain or LlamaIndex?",
      ],
    })
  }, [resolvedTheme, setChatConfig])

  return chatConfig
}
```

## Ask AI search bar modal button
The Ask AI search bar modal button is used to open the Ask AI search bar modal. The search bar modal is used to search the knowledge base and ask questions to the assistant.

```tsx
import dynamic from "next/dynamic";

const SearchBarModalButton = dynamic(
  () => import("@ai-pay/ask-ai").then((mod) => mod.SearchBarModalButton),
  {
    ssr: false,
  },
)

export function AskAiSearchButton(): React.JSX.Element | null {
  const chatConfig = useAskAiChatConfig()
  
  return <SearchBarModalButton chatConfig={chatConfig} />
}
```