
export type ErrorReason =
    "USER_NOT_FOUND" |
    "FETCH_ERROR" |
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
