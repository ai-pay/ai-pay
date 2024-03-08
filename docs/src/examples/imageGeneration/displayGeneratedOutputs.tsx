/* eslint-disable @next/next/no-img-element */
import {
  AiApiResponse, ImageGenerationRequest, ImageGenerationResponse, 
} from "ai-pay/models"
import { objectToPrettyJson } from "@/utils/objectToPrettyJson"

interface DisplayGeneratedOutputsProps {
  loadingForRequestData: ImageGenerationRequest | null
  outputs: {
    request: ImageGenerationRequest
    response: AiApiResponse<ImageGenerationResponse>
  }[]   
}

export function DisplayGeneratedOutputs({
  loadingForRequestData,
  outputs,
}: DisplayGeneratedOutputsProps): React.JSX.Element {
  if (outputs.length === 0 && !loadingForRequestData) {
    return <></>
  }
  
  return <div className="w-full rounded-md overflow-x-scroll flex flex-row gap-2">
    {loadingForRequestData && (
      <div className="flex flex-row gap-1 items-center min-w-fit bg-neutral-700 p-2 rounded-md">
        <div className="w-60">
          <pre className="break-words whitespace-pre-wrap bg-neutral-600 !p-1 rounded-md">
            <code className="text-xs !break-all ">
              {objectToPrettyJson(loadingForRequestData, 0)}
            </code>
          </pre>
        </div>
        <div className="animate-pulse bg-neutral-600 w-48 h-48 rounded-md flex items-center justify-center">
          Loading Image
        </div>
      </div>
    )}

    {outputs.map((output, index) => (
      <div key={outputs.length - index} className="flex flex-row gap-1 items-center min-w-fit bg-neutral-700 p-2 rounded-md">
        <div className="w-60">
          <pre className="break-words whitespace-pre-wrap bg-neutral-600 !p-1 rounded-md">
            <code className="text-xs !break-all ">
              {objectToPrettyJson(output.request, 0)}
            </code>
          </pre>
        </div>

        {output.response.data?.imageUrls.map((imageUrl) => (
          <img key={imageUrl} src={imageUrl} alt="Generated image" className="w-56 h-56 rounded-md" />
        ))}
      </div>
    ))}
  </div>
}