/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // MONABRIS – Rouge signature #E80505
        primary: {
          50: "#FFF5F5",
          100: "#FFE8E8",
          200: "#FFCACA",
          300: "#FF9D9D",
          400: "#FF6B6B",
          500: "#FF3A3A",
          600: "#E80505",
          700: "#C50505",
          800: "#A00404",
          900: "#7C0303",
          950: "#3D0101",
        },
        // Alias to keep existing `red-*` classes aligned with Monabris
        red: {
          50: "#FFF5F5",
          100: "#FFE8E8",
          200: "#FFCACA",
          300: "#FF9D9D",
          400: "#FF6B6B",
          500: "#FF3A3A",
          600: "#E80505",
          700: "#C50505",
          800: "#A00404",
          900: "#7C0303",
          950: "#3D0101",
        },
        // Neutral black scale (noir profond #020101 + dérivés)
        gray: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#EBEBEB",
          300: "#DEDEDE",
          400: "#BFBFBF",
          500: "#808080",
          600: "#4D4D4D",
          700: "#333333",
          800: "#1A1A1A",
          900: "#0F0F0F",
          950: "#020101",
        },
        monabris: {
          primary: "#E80505",
          secondary: "#020101",
          background: "#FAFAFA",
          surface: "#FFFFFF",
          text: "#020101",
          "text-secondary": "#4D4D4D",
          "text-light": "#808080",
          border: "#BFBFBF",
          white: "#FFFFFF",
          black: "#020101",
          success: "#16A34A",
          warning: "#F59E0B",
          error: "#E80505",
        },
        // Top-level aliases so `bg-secondary`, `text-success`, `border-border`, etc. resolve
        secondary: "#020101",
        success: "#16A34A",
        warning: "#F59E0B",
        error: "#E80505",
        border: "#BFBFBF",
        background: "#FAFAFA",
        surface: "#FFFFFF",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
      },
      fontSize: {
        display: ["3.5rem", { lineHeight: "1.1", fontWeight: "800" }],
        headline: ["2.5rem", { lineHeight: "1.15", fontWeight: "700" }],
        title: ["2rem", { lineHeight: "1.2", fontWeight: "700" }],
      },
      borderRadius: {
        card: "12px",
        pill: "9999px",
      },
      boxShadow: {
        soft: "0 2px 16px rgba(2, 1, 1, 0.06)",
        card: "0 1px 2px rgba(2, 1, 1, 0.04), 0 2px 8px rgba(2, 1, 1, 0.06)",
        "card-hover": "0 4px 12px rgba(2, 1, 1, 0.08), 0 8px 24px rgba(2, 1, 1, 0.10)",
        elevated: "0 8px 24px rgba(2, 1, 1, 0.10), 0 16px 40px rgba(2, 1, 1, 0.12)",
      },
      backgroundImage: {
        "brand-pattern":
          "url('/brand-pattern.svg')",
        "brand-pattern-light":
          "url('/brand-pattern-light.svg')",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.4s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "scale-in": "scale-in 0.25s ease-out",
        shimmer: "shimmer 1.5s infinite",
        float: "float 4s ease-in-out infinite",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};
