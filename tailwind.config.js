const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
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
        // Runway palette
        runway: {
          black:       '#000000',
          deepblack:   '#030303',
          surface:     '#1a1a1a',
          white:       '#ffffff',
          nearwhite:   '#fefefe',
          cloud:       '#e9ecf2',
          border:      '#27272a',
          charcoal:    '#404040',
          slate:       '#767d88',
          midslate:    '#7d848e',
          muted:       '#a7a7a7',
          silver:      '#c9ccd1',
          lightsilver: '#d0d4d4',
          footer:      '#999999',
        },
      },
      lineHeight: {
        tight: '1.0',
        film:  '1.05',
      },
      letterSpacing: {
        tightest: '-0.075em',
        tighter:  '-0.05em',
        runway:   '-0.03em',
        label:    '0.022em',
      },
    },
  },
  plugins: [],
};
