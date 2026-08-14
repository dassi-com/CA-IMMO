/** @type {import("tailwindcss").Config} */
module.exports = {
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
          50: "#FAFBF6",
          100: "#F4F4EF",
          200: "#E7E5E4",
          300: "#D6D3D1",
          400: "#A8A29E",
          500: "#78716C",
          600: "#5B5B5B",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0E0E0E",
        },
        monabris: {
          primary: "#C41E3A",
          secondary: "#171717",
          background: "#FAFBF6",
          warm: "#E7E5E4",
          text: "#171717",
          "text-secondary": "#5B5B5B",
          accent: "#C8B15D",
          border: "#E7E5E4",
          surface: "#FFFFFF",
          white: "#FFFFFF",
          black: "#171717",
          success: "#16A34A",
          warning: "#F59E0B",
          error: "#C41E3A",
        },
        // Top-level aliases so `bg-secondary`, `text-success`, `border-border`, etc. resolve
        secondary: "#171717",
        success: "#16A34A",
        warning: "#F59E0B",
        error: "#C41E3A",
        border: "#E7E5E4",
        background: "#FAFBF6",
        surface: "#FFFFFF",
        warm: "#E7E5E4",
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
