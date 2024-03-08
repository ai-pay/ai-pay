
let RootUrl = "https://www.joinaipay.com";

export function setRootUrl(url: string): void {
  RootUrl = url;
}

export function AiUsageUrl(): string { return RootUrl + "/api/ai-usage" }