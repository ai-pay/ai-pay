import {
  BrowserExtensionInstalledEvent , SessionDataChangeEvent , StartSessionRequestEvent 
} from "@/models"

export type ReceivingEvents = SessionDataChangeEvent & BrowserExtensionInstalledEvent
type ReceivingEventsKeys = keyof ReceivingEvents

export type SendingEvents = StartSessionRequestEvent
type SendingEventsKeys = keyof SendingEvents

export type AllCustomEvents = ReceivingEvents & SendingEvents

export function customEventEmitter<EventKey extends SendingEventsKeys>(
  event: EventKey, 
  data: SendingEvents[EventKey]["detail"],
): void {
  if (!window) {
    return
  }
  window.dispatchEvent(new CustomEvent(event, {
    detail: data,
  }))
}

export function customEventReceiver<EventKey extends ReceivingEventsKeys>(
  event: EventKey, 
  response: (event: ReceivingEvents[EventKey]) => void,
): void {
  if (!window) {
    return
  }
  window.addEventListener(event, (ev: ReceivingEvents[EventKey]) => {
    response(ev)
  })
}