import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 1. Add your new Fonts here
      fontFamily: {
        sans: ["var(--font-inter)"],   // Default text
        heading: ["var(--font-oswald)"], // Sporty Headlines
      },
      // 2. Add your Custom Colors here
      colors: {
        sr: {
          green: "#065f46", // Deep Green (Primary)
          lime: "#84cc16",  // Bright Lime (Accent)
          dark: "#111827",  // Almost Black (Text)
          light: "#f3f4f6", // Light Gray (Background)
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;