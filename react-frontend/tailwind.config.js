/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      colors: {
        primary: {
          50: '#eef6ff',
          100: '#d9e9ff',
          200: '#bcd9ff',
          300: '#8ebfff',
          400: '#5899ff',
          500: '#004A99', // Blue from logo
          600: '#003d7e',
          700: '#003165',
          800: '#00254c',
          900: '#001a35',
        },
        accent: {
          light: '#ffdf8d',
          DEFAULT: '#FDB913', // Yellow from logo
          dark: '#e3a500',
        },
        success: {
          DEFAULT: '#10b981', // Emerald Green
          dark: '#059669',
        }
      },
    },
  },
  plugins: [],
}
