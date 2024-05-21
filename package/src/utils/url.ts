
let RootUrl = "https://www.ai-pay.dev";

export function setRootUrl(url: string) {
  RootUrl = url;
}

export function constructUrl(path: string) {
  return (RootUrl + "/" + path).replace(/\/+/g, "/");
}
