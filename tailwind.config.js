/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}'],
  theme: {
    extend: {}
  },
  daisyui: {
    themes: ['light', 'dark']
  },
  darkMode: ['class', '[data-theme="night"]'],
  plugins: [require('daisyui')]
};
