import type { Config } from "tailwindcss"

const config = {
  content: [
    "**/*.{ts,tsx}",
  ],
  prefix: "",
  important: true,
} satisfies Config

export default config