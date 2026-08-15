import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        chalk: "#111111",
        "chalk-dim": "#171B22",
        ink: "#FAFAFA",
        "ink-soft": "#B8C1CF",
        indigo: {
          DEFAULT: "#FFC948",
          soft: "#3A311B"
        },
        coral: {
          DEFAULT: "#FFC948",
          soft: "#3A311B"
        },
        moss: "#78C2A0"
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
