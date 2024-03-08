
export function getDataFromDocument(id: string): string | undefined {
  if (!document) {
    return undefined;
  }

  const dataElement = document.body.getAttribute(id);

  if (!dataElement) {
    return undefined;
  }

  return dataElement;
}