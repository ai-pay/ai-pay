import { ChatCompletionStreamChunk , ChatCompletionStreamDecoder } from "@/models"
import { debugError } from "../../methods/debugLogs"

export async function* getIterableStream(body: ReadableStream<Uint8Array>): AsyncIterable<ChatCompletionStreamChunk> {
  const reader = body.getReader()
  const decoder = ChatCompletionStreamDecoder()

  reader
  
  while (true) {
    const {
      value, done, 
    } = await reader.read()

    if (done) {
      break
    }

    try {
      const decodedChunks = decoder(value)
      for (const chunk of decodedChunks) {
        yield chunk;
      }
    } catch (error) {
      debugError("Failed to decode chunks from the stream response", error)
    }
  }
}