import type { Config } from 'tailwindcss'
import formsPlugin from '@tailwindcss/forms'

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    formsPlugin
  ],
} satisfies Config

