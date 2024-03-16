import "@ai-pay/ask-ai/dist/index.css"
import { AskAiSearchButton } from "./AskAiSarchButton"
import { DocsThemeConfig } from "nextra-theme-docs"
import { Logo } from "./utils/Logo"

const config: DocsThemeConfig = {
  search: {
    component: <AskAiSearchButton />,
  },
  footer: {
    text: "AI Pay Pty Ltd 2023",
  },
  logo: <Logo />,
  logoLink: "https://www.joinaipay.com",
  head: () => (
    <>
      <meta name='ai-pay-website-identifier' content='{"websiteId":"UokVhddo8LtJgn2hLwvC","websiteName":"AI Pay Docs","websiteDescription":"Chat bot for AI Pay documentation.","recommendedCredit":10,"requestUsageOnPageLoad":false}' />
    </>
  ),
  useNextSeoProps() {
    return {
      titleTemplate: "%s - AI Pay",
    }
  },
  darkMode: true,
  themeSwitch: {
    useOptions: {
      dark: "Dark",
      light: "Light",
      system: "System",
    },
  },
  editLink: {
    text: "",
  },
  feedback: {
    content: "",
    labels: "", 
  },
  toc: {
    backToTop: true,
  },
  sidebar: {
    titleComponent({
      title, type, 
    }) {
      if (type === "separator") {
        return <span className="cursor-default">{title}</span>
      }
      return <>{title}</>
    },
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
}

export default config