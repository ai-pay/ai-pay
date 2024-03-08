import Link from "next/dist/client/link";

interface StyledLinkProps {
  href: string;
  text: string;
  newTab?: boolean;
}

export const BUTTON_CLASS_NAMES = "w-max rounded-md bg-neutral-200 px-6 py-3 text-sm font-medium transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus:bg-neutral-100 focus:text-neutral-900 focus:outline-none disabled:pointer-events-none  disabled:opacity-50 dark:bg-neutral-800 dark:hover:bg-neutral-600 dark:hover:text-neutral-50 dark:focus:bg-neutral-700 dark:focus:text-neutral-50"

export function StyledLink({
  href,
  text,
  newTab = false,
}: StyledLinkProps): React.JSX.Element {
  if (newTab) {
    return <a href={href}
      className={BUTTON_CLASS_NAMES}
      target="_blank"
      rel="noopener noreferrer"
    >
      {text}
    </a>
  }

  return <Link href={href}
    className={BUTTON_CLASS_NAMES}
  >
    {text}
  </Link>
}