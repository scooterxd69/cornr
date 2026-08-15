import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        chalk: "#080B14",
        "chalk-dim": "#101626",
        ink: "#F2F5FF",
        "ink-soft": "#A3AEC5",
        indigo: {
          DEFAULT: "#8294FF",
          soft: "#20295A"
        },
        coral: {
          DEFAULT: "#F09373",
          soft: "#46261F"
        },
        moss: "#8AAE9A"
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"]
      },
      borderRadius: {
        corner: "0 18px 18px 18px"
      },
      keyframes: {
        peel: {
          "0%": { transform: "rotate(0deg) translate(0,0)" },
          "100%": { transform: "rotate(-8deg) translate(-6px,4px)" }
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        rise: "rise 0.6s cubic-bezier(0.16,1,0.3,1) both",
        float: "float 10s ease-in-out infinite",
        orbit: "orbit 18s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
