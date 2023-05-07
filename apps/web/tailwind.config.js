import formsPlugin from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cinereous: '#7E6C6C',
        'light-red': '#F87575',
        melon: '#FFA9A3',
        'uranian-blue': '#B9E6FF',
        'cornflower-blue': '#5C95FF',
        'tifanny-blue': '#99E1D9',
        bittersweet: '#F25F5C',
      },
      gridTemplateRows: {
        'main-layout': 'auto 1fr auto',
      },
    },
  },
  plugins: [formsPlugin, require('prettier-plugin-tailwindcss')],
}
