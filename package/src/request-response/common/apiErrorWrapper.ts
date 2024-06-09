
export type ErrorReason =
  "INVALID_REQUEST" |
  "INVALID_AUTH_TOKEN" |
  "NO_AUTH_TOKEN" |
  "USER_NOT_FOUND" |
  "USAGE_LIMIT_REACHED" |
  "FETCH_ERROR" |
  "NO_USER_CREDITS" |
  "TODO" |
  "INTERNAL_SERVER_ERROR";

export type ApiErrorWrapper<Success extends object, E extends ErrorReason = ErrorReason> = {
  success: false;
  errorReason: E,
  debugMessage?: string;
  usageApiDevDebugMessage?: string;
} | ({
  success: true;
  usageApiDevDebugMessage?: string;
} & Success)
