import { CheckAccessRequest, CheckAccessResponse } from "./checkAccess";
import { RequestAccessRequest, RequestAccessResponse } from "./requestAccess";

export * from "./requestAccess";
export * from "./checkAccess";

export type ApiResponse<T> = {
  error: string
  debugError?: string
  data?: undefined
} | {
  error?: undefined
  debugError?: undefined
  data: T
}

export type PathToRequestResponse = {
  "/api/access/request": {
    request: RequestAccessRequest
    response: RequestAccessResponse
  }
  "/api/access/check": {
    request: CheckAccessRequest
    response: CheckAccessResponse
  }
}
