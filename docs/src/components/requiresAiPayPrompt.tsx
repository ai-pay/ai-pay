
import { StyledLink } from "./styledLink";
import { useSessionData } from "ai-pay-react-hooks";

interface SexyWrapperProps {
  children: React.ReactNode | React.ReactNode[];
}

export function SexyWrapper({
  children,
}: SexyWrapperProps): React.JSX.Element {
  return <div className="flex flex-col justify-center items-center gap-1 p-2 bg-neutral-700 rounded-md">
    {children}
  </div>
}

interface SectionHeaderProps {
  text: string
}
export function SectionHeader({
  text,
}: SectionHeaderProps): React.JSX.Element {
  return <h1 className="w-full text-xl font-bold">
    {text}
  </h1>
}

interface SectionDescriptionProps {
  text: string
}
export function SectionDescription(props: SectionDescriptionProps): React.JSX.Element {
  return <p className="w-full !text-zinc-100 text-base">{props.text}</p>
}

export function RequiresAiPayPrompt({
  featureName,
  featureAction,
}: {
  featureName: string
  featureAction: string
}): React.ReactNode {
  const {
    sessionState, 
    browserExtensionInstalled,
  } = useSessionData();

  if (!browserExtensionInstalled) {
    return <SexyWrapper>
      <SectionHeader text={`${featureName} required the AI Pay browser extension to be installed`} />
      <SectionDescription text="The browser extension is completely free to install. Every new account receives 100 free credits." />  

      <StyledLink 
        href={"https://chromewebstore.google.com/detail/ai-pay/igghgdjfklipjmgldcdfnpppgaijmhfg"} 
        text={"100 FREE credits when you download the browser extension "} 
        newTab
      />
    </SexyWrapper>
  }

  if (sessionState !== "ACTIVE") {
    return <SexyWrapper>
      <SectionHeader text={`${featureName} requires an active session`} />
      <SectionDescription text="Start a session using the AI Pay browser extension. Click on the browser extension then click start session." />  
      
      <StyledLink 
        href={"https://www.joinaipay.com/welcome"} 
        text={"Learn how to start an AI Pay session"} 
        newTab
      />
    </SexyWrapper>
  }

  return <SexyWrapper>
    <SectionHeader text="Active session detected" />
    <SectionDescription text={`You can now ${featureAction}.`} />
  </SexyWrapper>;
}