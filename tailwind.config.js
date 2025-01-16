/** @type {import('tailwindcss').Config} */
export const content = ['./index.html', './src/**/*.{js,ts,jsx,tsx}'];
export const theme = {
  extend: {
    colors: {
      deepOcean: '#070d17', // deepOcean
      charcoalGray: '#070d17', // charcoalGray
      goldenSand: {
        light: '#fffff', // sunglow.light
        DEFAULT: '#D2B48C', // sunglow.DEFAULT
      },
      silverMist: '#B0BEC5', // silverMist
      pureSnow: '#FAFAFA', // pureSnow
    },
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'], // Mantido para clareza
      openSans: ['Open Sans', 'sans-serif'], // Alternativa moderna e legível
      yellowtail: ['Yellowtail', 'sans-serif'], // Mantido caso precise de toques estilizados
    },
  },
};
export const plugins = [];
