import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FFFDEC",
        cream2: "#F7F3DD",
        surface: "#FFFEF7",
        ink: "#1A2421",
        ink2: "#56635F",
        ink3: "#66736E",
        teal: { DEFAULT: "#0F766E", dark: "#0B5F59", soft: "rgba(15,118,110,0.10)" },
        foam: "#8FD6CD",
        line: "#DED9BD",
        linesoft: "#EEE9D9",
        carbon: "#10201D"
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"]
      },
      boxShadow: { card: "0 1px 2px rgba(26,36,33,0.05)" }
    }
  },
  plugins: []
};
export default config;