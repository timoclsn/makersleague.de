const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    colors: {
      light: 'hsla(0, 0%, 100%, 1)',
      dark: 'hsla(152, 32%, 9%, 1)',
      blue: 'hsla(191, 34%, 92%, 1)',
      'blue-accent': 'hsla(189, 56%, 50%, 1)',
      pink: 'hsla(281, 78%, 74%, 1)',
      'pink-light': 'hsla(279, 81%, 96%, 1)',
      green: 'hsla(151, 32%, 30%, 1)',
      sand: 'hsla(43, 53%, 82%, 1)',
    },
    extend: {
      fontFamily: {
        sans: ['Space GroteskVariable', ...fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
