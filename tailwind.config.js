/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f0ab2f',
          light: '#f4bf5c',
          dark: '#d99620'
        },
        secondary: {
          DEFAULT: '#5e17eb',
          light: '#7a3eef',
          dark: '#4c12bc'
        }
      }
    },
  },
  plugins: [],
};