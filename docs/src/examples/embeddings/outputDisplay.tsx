import OpenAI from "openai"
import similarity from "compute-cosine-similarity"

function base64StringToFloat32Array(base64String: string): number[] {
  const embeddingBuffer = Buffer.from(base64String, "base64");
  return Array.from(new Float32Array(embeddingBuffer.buffer));
}
interface Props {
  output: OpenAI.Embeddings.CreateEmbeddingResponse
}

export function OpenAiCompatibleEmbeddingsOutputDisplay({
  output,
}: Props): React.JSX.Element {

  function calculateInputSimilarity(): number | null {
    if (typeof output.data[0].embedding === "string" || typeof output.data[1].embedding === "string") {
      return similarity(
        base64StringToFloat32Array(output.data[0].embedding as unknown as string), 
        base64StringToFloat32Array(output.data[1].embedding as unknown as string),
      )
    }
    return similarity(output.data[0].embedding, output.data[1].embedding)
  }

  return <div className="flex flex-col gap-2">
    {output.data.map((embedding, index) => {
      return <div key={index} className="flex gap-2 text-nowrap p-2 !bg-neutral-700 rounded-md shadow-md">
        <div>Embedding {embedding.index}:</div>
        <div className="overflow-x-scroll !bg-neutral-600 rounded-sm">{typeof embedding.embedding === "object" ? embedding.embedding.join(", ") : embedding.embedding}</div>
      </div>
    })}
    <div className="p-2 !bg-neutral-700 rounded-md shadow-md">
      Cosine Similarity: {calculateInputSimilarity()?.toFixed(2) ?? "N/A"}
    </div>
  </div>
}