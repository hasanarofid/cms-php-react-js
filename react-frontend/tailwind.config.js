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
          50: '#fefcff',   // Sangat terang (mirip background logo)
          100: '#f8e9fe',
          200: '#eeccfd',
          300: '#dd99fc',
          400: '#c55ff9',
          500: '#a450e1',  // Ungu terang (warna utama rambut)
          600: '#823cb2',
          700: '#632f87',   // Ungu gelap (warna bayangan rambut)
          800: '#4a2466',
          900: '#311844',
        },
      },
    },
  },
  plugins: [],
}
