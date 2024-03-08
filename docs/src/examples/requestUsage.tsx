import { AIPayBrowserExtensionLink } from "@/components/aiPayBrowserExtensionLink";
import { StyledButton } from "@/components/styledButton";
import { requestAiPayUsage } from "ai-pay/methods";
import { useIsBrowserExtensionInstalled } from "ai-pay-react-hooks";

export function RequestUsageExample(): React.JSX.Element {
  const isBrowserExtensionInstalled = useIsBrowserExtensionInstalled();

  return <div className="flex flex-col w-full items-center gap-2 mt-2">
    {!isBrowserExtensionInstalled && <h1>
            This example requires the <AIPayBrowserExtensionLink>
                AI Pay Browser extension
      </AIPayBrowserExtensionLink> to be installed.
    </h1>}
    <StyledButton 
      disabled={!isBrowserExtensionInstalled}
      onclick={(): void => requestAiPayUsage({
        requestType: "START_SESSION",
      })}>
            Request Usage  (Show AI Pay notification)
    </StyledButton>
  </div>
}