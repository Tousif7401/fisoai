import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#DEDBC8',
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;
