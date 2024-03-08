import { ChatCompletionStreamChunk } from "./requestResponse";
import { debugError } from "@/methods/debugLogs";

export function ChatCompletionStreamEncoder(): (response: ChatCompletionStreamChunk) => Uint8Array {
  const encoder = new TextEncoder();

  return (response: ChatCompletionStreamChunk) => {
    return encoder.encode(JSON.stringify(response));
  }
}

export function ChatCompletionStreamDecoder(): (chunk: Uint8Array) => ChatCompletionStreamChunk[] {
  const decoder = new TextDecoder();

  let previousChunk = "";

  return (chunk: Uint8Array) => {
    const jsonString = previousChunk + decoder.decode(chunk);

    const jsonObjects: string[] = jsonString.split("}{");
    previousChunk = "";

    const validJsonArray: string[] = jsonObjects.length <= 1 ? jsonObjects :
      jsonObjects.map((obj, index) => {
        const isFirstObject = index === 0;
        const isLastObject = index === jsonObjects.length - 1;

        if (isFirstObject) {
          return `${obj}}`;
        } else if (isLastObject) {
          return `{${obj}`;
        } else {
          return `{${obj}}`;
        }
      });

    return validJsonArray
      .map(json => {
        try {
          return JSON.parse(json)
        } catch (error) {
          debugError("Failed to parse json from stream response. Will prepend to next json string", error, json);
          previousChunk = json
          return null;
        }
      })
      .filter((json) => !!json);
  }
}

