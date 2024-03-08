
export async function streamToJson(stream: ReadableStream<Uint8Array>): Promise<unknown> {
  const reader = stream.getReader();
  let result = "";
  
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const {
      done, value, 
    } = await reader.read();
  
    if (done) {
      break;
    }
  
    // Convert Uint8Array to text
    const text = new TextDecoder().decode(value);
    result += text;
  }
  
  // Parse the accumulated text as JSON
  return JSON.parse(result);
}