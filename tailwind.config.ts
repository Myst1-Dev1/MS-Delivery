import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        "home-bg": "url(/images/home-bg.webp)",
        "restaurant-bg": "url(/images/restaurant-photo.webp)",
        "vector-bg": "url(/images/vector-bg.webp)"
      },
      strokeWidth: {
        '2': '20px',
      }
    },
  },
  plugins: [],
};
export default config;
