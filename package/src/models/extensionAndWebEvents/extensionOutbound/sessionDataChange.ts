
export type SessionStatus = "UNANSWERED" | "ACTIVE" | "ENDED"

interface SessionDataCommon {
  sessionState: SessionStatus
  browserExtensionInstalled: boolean
  sessionId?: string
}

interface UnansweredSessionData extends SessionDataCommon {
  sessionState: "UNANSWERED"
}

interface ActiveSessionData extends SessionDataCommon {
  sessionState: "ACTIVE"
  browserExtensionInstalled: true
  sessionId: string
}

interface EndedSessionData extends SessionDataCommon {
  sessionState: "ENDED"
  browserExtensionInstalled: true
}

export type SessionData = UnansweredSessionData | ActiveSessionData | EndedSessionData

export interface SessionDataChangeEvent {
  AI_PAY_SESSION_DATA_CHANGE: CustomEvent<SessionData>
}