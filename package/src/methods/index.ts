import { UrlFromAiPayRootUrl } from "@/apis/url";

export { requestAiPayUsage } from "./requestAiPayUsage";
export { setDebugLevel } from "./debugLogs";

export type FreeTrialInformation = {
    usd: number
    numberCredits: number
}

export function getFreeTrialInformation(): Promise<FreeTrialInformation> {
  return fetch(UrlFromAiPayRootUrl("/api/free-trial")).then(res => res.json())
}