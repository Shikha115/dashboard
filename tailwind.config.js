/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Custom colors for light and dark modes
        light: {
          background: "#ffffff",
          text: "#000000",
        },
        dark: {
          background: "#1a202c",
          text: "green",
        },
      },
    },
  },
  plugins: [],
};
