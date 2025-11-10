/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Ensure JSX/TSX files are covered
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8', // Tailwind's blue
        secondary: '#6EE7B7', // Green color for accent
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
