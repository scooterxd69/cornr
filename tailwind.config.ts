import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        chalk: "#F4F5F0",
        "chalk-dim": "#EAEAE2",
        ink: "#14161C",
        "ink-soft": "#3A3D46",
        indigo: {
          DEFAULT: "#4F46E5",
          soft: "#EEEDFC"
        },
        coral: {
          DEFAULT: "#FF6B4A",
          soft: "#FFE6DE"
        },
        moss: "#6B7A5E"
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
        rise: "rise 0.6s cubic-bezier(0.16,1,0.3,1) both"
      }
    }
  },
  plugins: []
};

export default config;
