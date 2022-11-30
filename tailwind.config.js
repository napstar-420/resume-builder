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
        mainBlue: '#239bb6',
        darkBlue: '#074368',
        mainBalck: '#303030',
        mainYellow: '#f2b202'
      }
    },
  },
  plugins: [],
}
