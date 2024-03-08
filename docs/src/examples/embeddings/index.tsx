
/* eslint-disable @next/next/no-img-element */
import { AiPayClient } from "ai-pay/client";
import { CreateEmbeddingResponse, EmbeddingCreateParams } from "openai/resources";
import { DynamicCodeBlock } from "@/components/bindInnerTextToSpan";
import { InputBuilderObjectWrapper } from "@/components/functionInputBuilder/objectWrapper";
import { OpenAiCompatibleEmbeddingsInputBuilder } from "./inputBuilder";
import { OpenAiCompatibleEmbeddingsOutputDisplay } from "./outputDisplay";
import { RequiresAiPayPrompt } from "@/components/requiresAiPayPrompt";
import { cn } from "@/utils/cn";
import { objectToPrettyJson } from "@/utils/objectToPrettyJson";
import { useState } from "react";
import OpenAI from "openai";
  
export function EmbeddingsExample({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {  
  const [output, setOutput] = useState<CreateEmbeddingResponse | undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  
  const [error, setError] = useState<string | null>(null)

  const [input, setInput] = useState<EmbeddingCreateParams & {input: string[]}>({
    input: [
      "A puppy playing in the grass",
      "A young dog playing in a green field",
    ],
    model: "text-embedding-3-large",
    dimensions: undefined,
    encoding_format: undefined,
  })
  
  async function calculateInputSimilarity(): Promise<void> {
    const sessionId = AiPayClient.getInstance().getClientSessionId()
    if (!sessionId) {
      setError("You need an active session to call the AI Pay APIs.")
      return
    }
  
    if (input.input.filter((val) => val === "").length !== 0) {
      setError("The inputs fields are required.")
      return
    }
  
    if (loading) {
      return
    }
    setLoading(true)
    setError(null)
    
    try {
      const client = new OpenAI({
        apiKey: sessionId,
        baseURL: "https://api.joinaipay.com/api/openai-compatible",
        dangerouslyAllowBrowser: true,
      })
      
      const result = await client.embeddings.create(input)

      setOutput(result)
    } catch (error) {
      setError("An error occurred while fetching the image")
      console.error("Error fetching image", error)
    }
    setLoading(false)
  }
  
  return <div className="flex flex-col gap-2 pt-2 text-white">

    <OpenAiCompatibleEmbeddingsInputBuilder input={input} setInput={setInput} />
  
    <InputBuilderObjectWrapper title={"Input Similarity"}>
      <button
        disabled={loading}
        className={cn(
          "!bg-neutral-700 h-10 rounded-md shadow-md",
          loading ? "animate-pulse" : "!hover:bg-neutral-600",
        )}
        onClick={calculateInputSimilarity}
      >Calculate Input Similarity (callGenerateEmbeddings)</button>
  
      {error && <div className="text-white bg-red-600 bg-opacity-25 px-3 py-1 ring-1 ring-red-500 rounded-md mx-auto">{error}</div>}

      {loading && <div className="text-white bg-blue-600 bg-opacity-25 px-3 py-1 ring-1 ring-blue-500 rounded-md mx-auto">Loading . . .</div>}
  
      {output === undefined && !error && !loading && <RequiresAiPayPrompt featureName={"Generating embeddings"} featureAction={"generate embeddings"} />}

      {output && <OpenAiCompatibleEmbeddingsOutputDisplay output={output} />}
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