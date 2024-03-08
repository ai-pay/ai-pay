
import { StyledLink } from "./styledLink";
import { useSessionData } from "ai-pay-react-hooks";

interface SexyWrapperProps {
  children: React.ReactNode | React.ReactNode[];
}

export function SexyWrapper({
  children,
}: SexyWrapperProps): React.JSX.Element {
  return <div className="flex flex-col justify-center items-center gap-2">
    {children}
  </div>
}

interface SectionHeaderProps {
  text: string
}
export function SectionHeader({
  text,
}: SectionHeaderProps): React.JSX.Element {
  return <h1 className="font-bold tracking-tighter text-xl md:text-2xl lg:text-3xl/none">
    {text}
  </h1>
}

interface SectionDescriptionProps {
  text: string
}
export function SectionDescription(props: SectionDescriptionProps): React.JSX.Element {
  return <p className="text-zinc-800 dark:text-zinc-100 text-center text-base md:text-lg lg:text-xl/none">{props.text}</p>
}

export function RequiresAiPayWrapper({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  const {
    sessionState, 
    browserExtensionInstalled,
  } = useSessionData();

  if (!browserExtensionInstalled) {
    return <SexyWrapper>
      <SectionHeader text="This example required the AI Pay browser extension to be installed" />
      <SectionDescription text="The browser extension is completely free to install. Every new account receives 100 free credits." />  

      <StyledLink 
        href={"https://chromewebstore.google.com/detail/ai-pay/igghgdjfklipjmgldcdfnpppgaijmhfg"} 
        text={"Download Browser Extension - It's free"} 
        newTab
      />
    </SexyWrapper>
  }

  if (sessionState !== "ACTIVE") {
    return <SexyWrapper>
      <SectionHeader text="This example requires an active session" />
      <SectionDescription text="Start a session using the AI Pay browser extension. Click on the browser extension then click start session." />  
      
      <StyledLink 
        href={"https://www.joinaipay.com/welcome"} 
        text={"Learn how to start an AI Pay session"} 
        newTab
      />
    </SexyWrapper>
  }

  return children;
}