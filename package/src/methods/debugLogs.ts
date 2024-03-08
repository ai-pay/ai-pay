/* eslint-disable @typescript-eslint/no-explicit-any */

export type DebugLevel = "none" | "error" | "all";

let debugLevel: DebugLevel = "none";

export function setDebugLevel(newLevel: DebugLevel): void {
  debugLevel = newLevel;
}

export function debugLog(...message: any[]): void {
  if (debugLevel === "all") {
    console.log("AI Pay debug: ", ...message);
  }
}

export function debugError(...message: any[]): void {
  if (debugLevel === "error" || debugLevel === "all") {
    console.error("AI Pay debug: ", ...message);
  }
}
