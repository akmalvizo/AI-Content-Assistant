/** @type {import('tailwindcss').Config} */
export default {
  // Scan all JSX/JS files inside src/ for class names
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      // Custom design tokens will be added in Phase 3
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
