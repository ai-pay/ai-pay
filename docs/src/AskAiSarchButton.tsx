import { ChatConfig } from "@ai-pay/ask-ai";
import { useEffect, useState } from "react";
import { useTheme } from "nextra-theme-docs";
import dynamic from "next/dynamic";
import { useMounted } from 'nextra/hooks'
import cn from 'clsx'
import SparklesIcon from "@heroicons/react/24/solid/SparklesIcon";

function useAskAiChatConfig(): ChatConfig | undefined{
  const {
    resolvedTheme, 
  } = useTheme()

  const [chatConfig, setChatConfig] = useState<ChatConfig>()

  useEffect(() => {
    setChatConfig({
      colorMode: (resolvedTheme ?? "auto") as "light" | "dark" | "auto",
      initialAssistantQuestion: "I'm here to answer any questions about the AI Pay documentation. How can I help you today?",
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

const AskAiModal = dynamic(
  () => import("@ai-pay/ask-ai").then((mod) => mod.AskAiModal),
  { ssr: false },
)

export function AskAiSearchButton(): React.JSX.Element | null {
  const [isShowing, setIsShowing] = useState(false)

  const chatConfig = useAskAiChatConfig()

  const mounted = useMounted()

  useEffect(() => {
    const down = (e: globalThis.KeyboardEvent): void => {
      if (
        (e.key === 'k' &&
          (e.metaKey /* for Mac */ || /* for non-Mac */ e.ctrlKey))
      ) {
        setIsShowing(true)
      } else if (e.key === 'Escape') {
        setIsShowing(false)
      }
    }

    window.addEventListener('keydown', down)
    return () => {
      window.removeEventListener('keydown', down)
    }
  }, [])

  return <div className='nextra-search relative md:nx-w-64'>
    <button 
      onClick={() => setIsShowing(true)}
      className="nx-relative nx-flex nx-items-center nx-text-gray-900 contrast-more:nx-text-gray-800 flex gap-16 dark:nx-text-gray-300 contrast-more:dark:nx-text-gray-300 nx-bg-black/[.05] dark:nx-bg-gray-50/10 nx-rounded-lg pr-3">
      <span
        className={cn(
          'nx-block nx-w-full nx-appearance-none nx-rounded-lg nx-px-3 nx-py-2 nx-transition-colors',
          'nx-text-base nx-leading-tight md:nx-text-sm',
          'focus:nx-bg-white dark:focus:nx-bg-dark',
          'placeholder:nx-text-gray-500 dark:placeholder:nx-text-gray-400',
          'contrast-more:nx-border contrast-more:nx-border-current'
        )}
      >Ask AI ...</span>
      <kbd
        className={cn(
          'nx-my-1.5 nx-select-none ltr:nx-right-1.5 rtl:nx-left-1.5',
          'nx-h-5 nx-rounded nx-bg-white nx-px-1.5 nx-font-mono nx-text-[10px] nx-font-medium nx-text-gray-500',
          'nx-border dark:nx-border-gray-100/20 dark:nx-bg-dark/50',
          'contrast-more:nx-border-current contrast-more:nx-text-current contrast-more:dark:nx-border-current',
          'nx-items-center nx-gap-1 nx-transition-opacity',
          'nx-pointer-events-none nx-hidden sm:nx-flex'
        )}
        title={undefined}
      >
        {!mounted || navigator.userAgent.includes('Macintosh') ? (
          <>
            <span className="nx-text-xs">⌘</span>K
          </>
        ) : (
          'CTRL K'
        )}
      </kbd>
    </button>

    <button 
      className="fixed bottom-10 right-10 rounded-full py-4 px-5 text-white flex gap-2 bg-gradient-to-r from-blue-400 to-blue-600 text-lg font-bold shadow-lg
      hover:transform hover:scale-110 transition-transform duration-300 ease-in-out"
      onClick={() => setIsShowing(true)}
    >
      <p>
        Ask AI 
      </p>
      <SparklesIcon className="w-6" />
    </button>
    <AskAiModal isShowing={isShowing} onClose={() => setIsShowing(false) } chatConfig={chatConfig} />
  </div>
}