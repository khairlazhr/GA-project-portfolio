module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    colors: {
      "black": "#010103",
      "white": "#fff",
      "burlywood": "#d3ad7f"
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
