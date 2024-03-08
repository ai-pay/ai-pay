
/* eslint-disable @next/next/no-img-element */
import { AiPayClient } from "ai-pay/client";

import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions";
import { DynamicCodeBlock } from "@/components/bindInnerTextToSpan";
import { InputBuilderObjectWrapper } from "@/components/functionInputBuilder/objectWrapper";
import { OpenAiCompatibleChatCompletionInputBuilder } from "./inputBuilder";
import { OpenAiCompatibleChatCompletionOutputDisplay } from "./outputDisplay";
import { RequiresAiPayPrompt } from "@/components/requiresAiPayPrompt";
import { cn } from "@/utils/cn";
import { objectToPrettyJson } from "@/utils/objectToPrettyJson";
import { useState } from "react";
import OpenAI from "openai";
  
export function ChatCompletionExample({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {  
  const [outputs, setOutputs] = useState<string[] | undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const [input, setInput] = useState<ChatCompletionCreateParamsBase>({
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant that only responds in rhymes in the style of dr seuss.",
      },
      {
        role: "user",
        content: "What is the weather like on the north pole?",
      },
    ],
    model: "gpt-4",
    stream: true,
    n: undefined,
    seed: undefined,
    response_format: undefined,
    max_tokens: undefined,
    frequency_penalty: undefined,
    presence_penalty: undefined,
    temperature: undefined,
    top_p: undefined,
  })
  
  async function calculateInputSimilarity(): Promise<void> {
    const sessionId = AiPayClient.getInstance().getClientSessionId()
    if (!sessionId) {
      setError("You need an active session to call the AI Pay APIs.")
      return
    }
  
    if (loading) {
      return
    }
    setLoading(true)
    setError(null)
    setOutputs(undefined)
    
    try {
      const client = new OpenAI({
        apiKey: sessionId,
        baseURL: "https://api.joinaipay.com/api/openai-compatible",
        dangerouslyAllowBrowser: true,
      })

      console.log("input", input)
      
      const result = await client.chat.completions.create(input)

      console.log("result", result)

      if ("choices" in result) {
        setOutputs(result.choices.map((choice) => choice.message.content ?? "Empty message"))
      } else {
        let outputMessage = ""
        for await (const chunk of result) {
          outputMessage += chunk.choices[0].delta.content ?? ""
          setOutputs([outputMessage])
        }
      }
    } catch (error) {
      setError("An error occurred while fetching the response.")
      console.error("Error fetching chat completion", error)
    }
    setLoading(false)
  }
  
  return <div className="flex flex-col gap-2 pt-2 text-white">

    <OpenAiCompatibleChatCompletionInputBuilder input={input} setInput={setInput} />
  
    <InputBuilderObjectWrapper title={"Chat Completion Output"}>
      <button
        disabled={loading}
        className={cn(
          "!bg-neutral-700 h-10 rounded-md shadow-md",
          loading ? "animate-pulse" : "!hover:bg-neutral-600",
        )}
        onClick={calculateInputSimilarity}
      >Generate Responses (callChatCompletion)</button>
  
      {error && <div className="text-white bg-red-600 bg-opacity-25 px-3 py-1 ring-1 ring-red-500 rounded-md mx-auto">{error}</div>}

      {loading && <div className="text-white bg-blue-600 bg-opacity-25 px-3 py-1 ring-1 ring-blue-500 rounded-md mx-auto">Loading . . .</div>}
  
      {!error && !loading && outputs === undefined && <RequiresAiPayPrompt featureName={"Generating chat completion"} featureAction={"generate chat completion"} />}

      {outputs && <OpenAiCompatibleChatCompletionOutputDisplay output={outputs} />}
    </ InputBuilderObjectWrapper>

    <div className="[&_*]:z-10">
      <DynamicCodeBlock 
        replaceString={"INPUT"} 
        newString={objectToPrettyJson(input, 2)}
      >
        {children}
      </DynamicCodeBlock>
    </div>
  </div>
}