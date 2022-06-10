const theme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'media',
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Raleway', ...theme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
