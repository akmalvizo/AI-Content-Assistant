/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: "class", // toggle dark mode via a class on <html>
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        // Brand emerald accent used throughout the UI
        brand: {
          50:  "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
        },
      },
      keyframes: {
        // Typing indicator bounce
        bounce3: {
          "0%, 80%, 100%": { transform: "translateY(0)" },
          "40%":            { transform: "translateY(-6px)" },
        },
        // Sidebar slide-in on mobile
        slideIn: {
          from: { transform: "translateX(-100%)" },
          to:   { transform: "translateX(0)" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        bounce3:  "bounce3 1.2s ease-in-out infinite",
        "slide-in": "slideIn 0.25s ease-out",
        "fade-in":  "fadeIn 0.3s ease-out",
      },
    },
  },
  plugins: [],
};
