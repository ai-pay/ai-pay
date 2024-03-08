import { IS_AI_PAY_INSTALLED_ELEMENT_ID, SESSION_ID_DATA_ELEMENT_ID } from "../../models/variables";
import { getDataFromDocument } from "./getDataFromDocument";

export function getAllDataFromDocument(): {
  sessionId: string | undefined,
  browserExtensionInstalled: boolean,
} {
  if (!document) {
    return {
      sessionId: undefined,
      browserExtensionInstalled: false,
    };
  }

  const sessionIdData = getDataFromDocument(SESSION_ID_DATA_ELEMENT_ID);
  const isBrowserExtensionInstalledData = getDataFromDocument(IS_AI_PAY_INSTALLED_ELEMENT_ID);

  return {
    sessionId: sessionIdData,
    browserExtensionInstalled: !!isBrowserExtensionInstalledData,
  };
}