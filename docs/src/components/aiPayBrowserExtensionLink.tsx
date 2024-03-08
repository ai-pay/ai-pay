
interface AIPayBrowserExtensionLinkProps {
  children: React.ReactNode;
}

export function AIPayBrowserExtensionLink(props: AIPayBrowserExtensionLinkProps): React.JSX.Element {
  return <a 
    className="text-blue-500 hover:underline"
    href="https://chromewebstore.google.com/detail/ai-pay/igghgdjfklipjmgldcdfnpppgaijmhfg"
    target="_blank"
    rel="noopener noreferrer"
  >
    {props.children}
  </a>
}