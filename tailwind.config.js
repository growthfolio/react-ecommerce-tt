/** @type {import('tailwindcss').Config} */
export const content = ['./index.html', './src/**/*.{js,ts,jsx,tsx}'];
export const theme = {
  extend: {
    colors: {
      emerald: '#070d17', // Azul forte para confiança e estabilidade
      darkMossGreen: '#070d17', // Cinza escuro sofisticado para textos e headers
      sunglow: {
        light: '#fffff', // Tom quente para fundos e destaques secundários
        DEFAULT: '#D2B48C', // Fundo principal ou contrastes sutis
      },
      davysGray: '#B0BEC5', // Cinza claro para bordas e elementos neutros
      seasalt: '#FAFAFA', // Fundo geral e áreas de respiro visual
    },
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'], // Mantido para clareza
      openSans: ['Open Sans', 'sans-serif'], // Alternativa moderna e legível
      yellowtail: ['Yellowtail', 'sans-serif'], // Mantido caso precise de toques estilizados
    },
  },
};
export const plugins = [];
