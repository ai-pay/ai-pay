import type { Config } from "tailwindcss"

const config = {
  content: [
    "**/*.{ts,tsx}",
  ],
  darkMode: "class",
  prefix: "",
  important: true,
} satisfies Config

export default config