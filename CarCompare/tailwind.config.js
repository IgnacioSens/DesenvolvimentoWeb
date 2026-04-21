/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E63946',
          50:  '#fef2f2',
          100: '#fee2e2',
          500: '#E63946',
          600: '#cc2f3b',
          700: '#a8222c',
        },
        navy: {
          DEFAULT: '#0A0F2C',
          800: '#0f1535',
          900: '#0A0F2C',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
