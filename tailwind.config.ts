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
        background: "#FFFDF7",
        primary: "#FF6B35",
        secondary: "#0099CC",
        accent: "#FF9F1C",
        dark: "#1F2937",
        muted: "#6B7280",
      },
      fontFamily: {
        heading: ['"Bebas Neue"', "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

