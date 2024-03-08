
export async function getFirstChunk(asyncIterable: AsyncIterable<unknown>): Promise<unknown | undefined> {
  const iterator = asyncIterable[Symbol.asyncIterator]();
  const {
    value, done, 
  } = await iterator.next();
  
  return done ? undefined : value;
}