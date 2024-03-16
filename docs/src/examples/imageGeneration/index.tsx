/* eslint-disable @next/next/no-img-element */
import {
  AiApiResponse,
  AiPayClient,
  ImageGenerationRequest, ImageGenerationResponse, imageGeneration, 
} from "ai-pay";
import { DisplayGeneratedOutputs } from "./displayGeneratedOutputs";
import { DynamicCodeBlock } from "@/components/bindInnerTextToSpan";
import { ImageGenerationInputBuilder } from "./imageGenerationInputBuilder";
import { InputBuilderObjectWrapper } from "@/components/functionInputBuilder/objectWrapper";
import { RequiresAiPayPrompt } from "@/components/requiresAiPayPrompt";
import { cn } from "@/utils/cn";
import { objectToPrettyJson } from "@/utils/objectToPrettyJson";
import { useState } from "react";

export function ImageGenerationExample({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  const [outputs, setOutputs] = useState<{
    request: ImageGenerationRequest
    response: AiApiResponse<ImageGenerationResponse>
  }[]>([])

  const [loadingForRequestData, setLoadingForRequestData] = useState<ImageGenerationRequest | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [imageInput, setImageInput] = useState<ImageGenerationRequest>({
    prompt: "Cute black cat with wings and 2 horns in a lush green forest in the style of cartoon psychedelic",
    imageModel: "dall-e-3",
    quality: "standard",
    size: "1024x1024",
    style: "vivid",
  })

  async function callImageGeneration(): Promise<void> {
    if (!AiPayClient.getInstance().getClientSessionId()) {
      setError("You must have a valid session to call the image generation API")
      return
    }

    if (imageInput.prompt === "") {
      setError("The prompt field is required. Please enter a prompt.")
      return
    }

    if (loadingForRequestData) {
      return
    }
    setLoadingForRequestData(imageInput)
    setError(null)

    try {
      const {
        error,
        debugError,
        data,
      } = await imageGeneration(imageInput)
  
      if (!data) {
        setError(error)
        console.error("AI Pay debug error", debugError)
      } else {
        setOutputs([
          {
            request: imageInput,
            response: {
              error,
              debugError, 
              data,
            },
          },
          ...outputs,
        ])
      }
  
    } catch (error) {
      setError("An error occurred while fetching the image")
      console.error("Error fetching image", error)
    }
    setLoadingForRequestData(null)
  }

  return <div className="flex flex-col gap-2 pt-2 text-white">
    <ImageGenerationInputBuilder 
      input={imageInput} 
      setInput={setImageInput} />

    <InputBuilderObjectWrapper title={"Generated Images"}>
      <button
        disabled={!!loadingForRequestData}
        className={cn(
          "bg-neutral-700 h-10 rounded-md shadow-md",
          loadingForRequestData ? "animate-pulse" : "hover:bg-neutral-600",
        )}
        onClick={callImageGeneration}
      >Generate Images (callImageGeneration)</button>

      {error && <div className="text-white bg-red-600 bg-opacity-25 px-3 py-1 ring-1 ring-red-500 rounded-md mx-auto">{error}</div>}

      {outputs.length === 0 && loadingForRequestData === null && <RequiresAiPayPrompt featureName={"Generating images"} featureAction={"generate images"} />}

      <DisplayGeneratedOutputs outputs={outputs} loadingForRequestData={loadingForRequestData} />
      
    </InputBuilderObjectWrapper>

    <div className="[&_*]:z-10">
      <DynamicCodeBlock 
        replaceString={"INPUT"} 
        newString={objectToPrettyJson(imageInput, 2)}
      >
        {children}
      </DynamicCodeBlock>
    </div>
  </div>
}