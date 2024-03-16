import { ChatConfig } from "@ai-pay/ask-ai";
import { useEffect, useState } from "react";
import { useTheme } from "nextra-theme-docs";
import dynamic from "next/dynamic";

function useAskAiChatConfig(): ChatConfig | undefined{
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