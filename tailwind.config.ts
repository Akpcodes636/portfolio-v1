import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          light: "#FFFFFFF",
          dark: "bg-zinc-900",
        },
        foreground: "var(--foreground)",
        primary: "#3b82f6", // VIBRANT CORAL
        secondary: "#6C63FF", // Electric purpke
        accent: "#2EC4B6", // Turquoise
        dark: "#2D3047", // Deep  navy
        light: "#F7F9FC", // Off-white
        textDark: "#1A1D2F",
        textMuted: "#4A5568",
        textLight: "#718096",
        background: "#f6f4f2",
      },
    },
  },
  plugins: [],
} satisfies Config;
