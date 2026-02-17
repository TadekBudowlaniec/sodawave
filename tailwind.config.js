/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        soda: {
          primary:     "#2AACBC",
          dark:        "#1A9BAB",
          light:       "#3BBFCF",
          bg:          "#D6F3F7",
          "bg-soft":   "#F0FBFD",
          footer:      "#1A7A8A",
          "footer-dk": "#0f5f6d",
        },
      },
      fontFamily: {
        sans: ["Nunito", "Poppins", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        "soda-sm": "0 2px 12px rgba(42,172,188,0.15)",
        "soda-md": "0 4px 22px rgba(42,172,188,0.25)",
        "soda-lg": "0 8px 40px rgba(42,172,188,0.35)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};
