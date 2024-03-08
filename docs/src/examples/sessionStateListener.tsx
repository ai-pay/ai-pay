import { AIPayBrowserExtensionLink } from "@/components/aiPayBrowserExtensionLink";
import { useSessionData } from "ai-pay-react-hooks";

export function SessionStateListenerExample(): React.JSX.Element {
  const {
    sessionState,
    browserExtensionInstalled,
  } = useSessionData();

  const DisplayRow = ({
    label, value, 
  }: {
    label: string,
    value: string
  }): React.JSX.Element => {
    return <p className="flex flex-row bg-white !text-black py-1 px-3 rounded">
      {label} {value}
    </p>
  }
  
  return <div className="flex flex-col w-full items-center gap-1 pt-3">
    <DisplayRow label="sessionState: " value={sessionState} />
    <DisplayRow label="isBrowserExtensionInstalled: " value={browserExtensionInstalled ? "true": "false"} />
    {sessionState === "ACTIVE"
      ?
      "The Session is currently active. This website can now make any AI Pay API request."
      :
      browserExtensionInstalled ? 
        "You have the AI Pay browser extension installed. Start a session to see this component change."
        :
        <p>
          You don&apos;t have the AI Pay browser extension installed. Install it from here <AIPayBrowserExtensionLink>
            Download Extension
          </AIPayBrowserExtensionLink>.
        </p>
    }
  </div>
}