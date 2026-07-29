import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lab: {
          bg: "#0c0c16",
          surface: "#18182a",
          border: "#2a2a44",
          accent: "#00ffb3",
          "accent-dim": "#00cc8f",
          warn: "#ffcc33",
          error: "#ff5577",
          text: "#e0e4ee",
          "text-dim": "#9ea3b4",
          "text-bright": "#f4f6fa",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "scan-line": "scanLine 3s linear infinite",
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "blink": "blink 1s step-end infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 8px rgba(0,255,179,0.15)" },
          "50%": { boxShadow: "0 0 20px rgba(0,255,179,0.35)" },
        },
        scanLine: { "0%": { transform: "translateY(-100%)" }, "100%": { transform: "translateY(100%)" } },
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: { "0%": { opacity: "0", transform: "translateY(20px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        blink: { "0%, 100%": { opacity: "1" }, "50%": { opacity: "0" } },
      },
    },
  },
  plugins: [],
};

export default config;