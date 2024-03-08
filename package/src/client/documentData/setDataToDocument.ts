
export function setDataToDocument(id: string, data: string): void {
  if (!document) {
    return undefined;
  }
  
  document.body.setAttribute(id, data);
}