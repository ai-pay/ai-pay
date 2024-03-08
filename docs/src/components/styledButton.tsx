import { BUTTON_CLASS_NAMES } from "./styledLink"

interface StyledButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  onclick: () => void;
}

export function StyledButton({
  children,
  disabled = false,
  onclick,
}: StyledButtonProps): React.JSX.Element {
  return <button
    className={BUTTON_CLASS_NAMES}
    disabled={disabled}
    onClick={onclick}
  >
    {children}
  </button>
}