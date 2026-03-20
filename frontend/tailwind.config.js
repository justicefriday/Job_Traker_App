/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1B3C53',
        'primary-dark': '#234C6A',
        secondary: '#456882',
        accent: '#D2C1B6',
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
        bounce: 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}