/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["src/js/**/*.tsx", "public/**/*.html"],
  jit: true,
  theme: {
    extend: {},
    fontFamily: {
      "sans": ['"IBM Plex Sans JP"', "sans-serif"],
      "serif": ['"Playfair Display"', "serif"],
    },
    screens: {
      pc: "1024px",
    }
  },
  plugins: [],
}
