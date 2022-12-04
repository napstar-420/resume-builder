/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{jsx,js,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        lightBlue: '#00e6e6',
        mainBlue: '#0099FF',
        darkBlue: '#074368',
        mainBlack: '#303030',
        mainYellow: '#f2b202'
      },
      screens: {
        xs: '500px'
      }
    },
  },
  plugins: [],
}
