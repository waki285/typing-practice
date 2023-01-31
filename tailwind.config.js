/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["src/js/**/*.tsx", "public/**/*.html"],
  jit: true,
  theme: {
    extend: {},
    fontFamily: {
      "sans": ['"IBM Plex Sans JP"', "sans-serif"],
      "serif": ['"Playfair Display"', "serif"],
      "inputserif": ['"Noto Serif Khojki"', '"Playfair Display"', "serif"],
    }
  },
  plugins: [],
}
