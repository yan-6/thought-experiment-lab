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
        "hover-lift": "hoverLift 0.3s ease-out forwards",
        "shimmer": "shimmer 2s linear infinite",
        "scale-in": "scaleIn 0.3s ease-out",
        "float": "float 3s ease-in-out infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "border-beam": "borderBeam 3s linear infinite",
        "bounce-in": "bounceIn 0.5s ease-out",
        "ripple": "ripple 0.6s ease-out",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 8px rgba(0,255,179,0.15)" },
          "50%": { boxShadow: "0 0 20px rgba(0,255,179,0.35)" },
        },
        scanLine: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: { "0%, 100%": { opacity: "1" }, "50%": { opacity: "0" } },
        hoverLift: {
          "0%": { transform: "translateY(0)", boxShadow: "0 0 0 rgba(0,255,179,0)" },
          "100%": { transform: "translateY(-4px)", boxShadow: "0 8px 30px rgba(0,255,179,0.12)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(0,255,179,0.2), 0 0 20px rgba(0,255,179,0.05)" },
          "50%": { boxShadow: "0 0 15px rgba(0,255,179,0.4), 0 0 40px rgba(0,255,179,0.1)" },
        },
        borderBeam: {
          "0%": { borderColor: "rgba(0,255,179,0.1)" },
          "50%": { borderColor: "rgba(0,255,179,0.5)" },
          "100%": { borderColor: "rgba(0,255,179,0.1)" },
        },
        bounceIn: {
          "0%": { opacity: "0", transform: "scale(0.3)" },
          "50%": { transform: "scale(1.05)" },
          "70%": { transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "1" },
          "100%": { transform: "scale(4)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;