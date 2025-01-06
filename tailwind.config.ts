import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: "#FFCCE1",
        gray: "#F2F9FF",
        "pink-red": "#F72C5B",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
