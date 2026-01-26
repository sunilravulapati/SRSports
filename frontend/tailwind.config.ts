import type { Config } from "tailwindcss";

const config: Config = {
  // This tells Tailwind to look inside 'app' directly, not 'src/app'
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", 
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;