const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
      colors: {
        runway: {
          black:     '#000000',
          deepblack: '#030303',
          surface:   '#1a1a1a',
          white:     '#ffffff',
          cloud:     '#e9ecf2',
          border:    '#27272a',
          charcoal:  '#404040',
          slate:     '#767d88',
          midslate:  '#7d848e',
          muted:     '#a7a7a7',
          silver:    '#c9ccd1',
          footer:    '#999999',
        },
      },
      maxWidth: {
        content: '850px',
      },
    },
  },
  plugins: [],
};
