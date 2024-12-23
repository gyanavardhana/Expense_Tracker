/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#FBE4BD",
        secondary: "#967959",
        terinary: "#221C0F"
      }
    },
  },
  plugins: [],
}

