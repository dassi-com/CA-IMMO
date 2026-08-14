/** @type {import("tailwindcss").Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // MONABRIS – Rouge signature
        primary: {
          50: "#FDF2F4",
          100: "#FBE3E8",
          200: "#F7C3CB",
          300: "#F096A4",
          400: "#E35D72",
          500: "#D83A52",
          600: "#C41E3A",
          700: "#A41930",
          800: "#881528",
          900: "#6E1121",
          950: "#42070F",
        },
        // Alias to keep existing `red-*` classes aligned with Monabris
        red: {
          50: "#FDF2F4",
          100: "#FBE3E8",
          200: "#F7C3CB",
          300: "#F096A4",
          400: "#E35D72",
          500: "#D83A52",
          600: "#C41E3A",
          700: "#A41930",
          800: "#881528",
          900: "#6E1121",
          950: "#42070F",
        },
        // Warm neutral scale (borders, backgrounds, text secondary)
        gray: {
          50: "rgb(var(--gray-50) / <alpha-value>)",
          100: "rgb(var(--gray-100) / <alpha-value>)",
          200: "rgb(var(--gray-200) / <alpha-value>)",
          300: "rgb(var(--gray-300) / <alpha-value>)",
          400: "rgb(var(--gray-400) / <alpha-value>)",
          500: "rgb(var(--gray-500) / <alpha-value>)",
          600: "rgb(var(--gray-600) / <alpha-value>)",
          700: "rgb(var(--gray-700) / <alpha-value>)",
          800: "rgb(var(--gray-800) / <alpha-value>)",
          900: "rgb(var(--gray-900) / <alpha-value>)",
          950: "rgb(var(--gray-950) / <alpha-value>)",
        },
        monabris: {
          primary: "#C41E3A",
          secondary: "rgb(var(--color-secondary) / <alpha-value>)",
          background: "rgb(var(--color-background) / <alpha-value>)",
          warm: "rgb(var(--color-warm) / <alpha-value>)",
          text: "rgb(var(--color-text) / <alpha-value>)",
          "text-secondary": "rgb(var(--color-text-secondary) / <alpha-value>)",
          accent: "#C8B15D",
          border: "rgb(var(--color-border) / <alpha-value>)",
          surface: "rgb(var(--color-surface) / <alpha-value>)",
          white: "#FFFFFF",
          black: "#171717",
          success: "#16A34A",
          warning: "#F59E0B",
          error: "#C41E3A",
        },
        // Top-level aliases so `bg-secondary`, `text-success`, `border-border`, etc. resolve
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        success: "#16A34A",
        warning: "#F59E0B",
        error: "#C41E3A",
        border: "rgb(var(--color-border) / <alpha-value>)",
        background: "rgb(var(--color-background) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        warm: "rgb(var(--color-warm) / <alpha-value>)",
        accent: {
          50: "#FAF6EC",
          100: "#F3EAD3",
          200: "#E7D6A5",
          300: "#DAC277",
          400: "#C8B15D",
          500: "#B29B45",
          600: "#927C36",
          700: "#75622D",
          800: "#5C4D26",
          900: "#453A1E",
        },
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
        soft: "0 2px 16px rgba(23, 23, 23, 0.06)",
        card: "0 1px 2px rgba(23, 23, 23, 0.04), 0 2px 8px rgba(23, 23, 23, 0.06)",
        "card-hover": "0 4px 12px rgba(23, 23, 23, 0.08), 0 8px 24px rgba(23, 23, 23, 0.10)",
        elevated: "0 8px 24px rgba(23, 23, 23, 0.10), 0 16px 40px rgba(23, 23, 23, 0.12)",
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
