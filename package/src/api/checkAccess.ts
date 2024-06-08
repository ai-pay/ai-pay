import { CheckAccessRequest } from "@/request-response/checkAccess";
import { typedFetch } from "./fetch";

export function checkAccess(
  apiKey: string,
  request: CheckAccessRequest,
) {
  return typedFetch(apiKey, request, "/check-access");
}
