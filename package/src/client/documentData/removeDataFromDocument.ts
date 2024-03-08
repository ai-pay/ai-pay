
export function removeDataFromDocument(id: string): void {
  if (!document) {
    return undefined;
  }
  
  document.body.removeAttribute(id);
}