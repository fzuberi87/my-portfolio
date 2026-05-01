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
        sans:    ['var(--font-inter)', ...fontFamily.sans],
        display: ['var(--font-eb-garamond)', 'Times New Roman', 'serif'],
      },
      colors: {
        el: {
          // Text
          ink:            '#0c0a09',
          primary:        '#292524',
          body:           '#4e4e4e',
          'body-strong':  '#292524',
          muted:          '#777169',
          'muted-soft':   '#a8a29e',
          // Surfaces
          canvas:         '#f5f5f5',
          'canvas-soft':  '#fafafa',
          'canvas-deep':  '#0c0a09',
          card:           '#ffffff',
          strong:         '#f0efed',
          dark:           '#0c0a09',
          'dark-elevated':'#1c1917',
          'on-dark':      '#ffffff',
          'on-dark-soft': '#a8a29e',
          // Hairlines
          hairline:       '#e7e5e4',
          'hairline-soft':'#f0efed',
          'hairline-strong':'#d6d3d1',
          // Gradient orbs
          mint:           '#a7e5d3',
          peach:          '#f4c5a8',
          lavender:       '#c8b8e0',
          sky:            '#a8c8e8',
          rose:           '#e8b8c4',
        },
      },
      maxWidth: {
        content: '850px',
      },
      borderRadius: {
        pill: '9999px',
      },
    },
  },
  plugins: [],
};
