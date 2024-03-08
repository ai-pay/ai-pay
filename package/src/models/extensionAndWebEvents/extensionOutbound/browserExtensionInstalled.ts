
export type BrowserExtensionInstalled = void

export interface BrowserExtensionInstalledEvent {
  AI_PAY_BROWSER_EXTENSION_INSTALLED: CustomEvent<BrowserExtensionInstalled>
}