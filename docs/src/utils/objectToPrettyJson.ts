
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function objectToPrettyJson(obj: any, indents: number): string {
  const indentString = " ".repeat(indents)
  return JSON.stringify(obj, null, 2).replace(/\n/g, `\n${indentString}`)
}