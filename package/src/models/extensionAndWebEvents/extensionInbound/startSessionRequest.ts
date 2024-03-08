
export interface SessionRequestData {
  requestType: "START_SESSION" | "ADDITIONAL_CREDIT"
}
    
export interface StartSessionRequestEvent {
  AI_PAY_START_SESSION_REQUEST: CustomEvent<SessionRequestData>
}
