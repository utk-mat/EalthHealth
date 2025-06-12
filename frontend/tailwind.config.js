/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6', // Tailwind blue-500
          light: '#60A5FA', // Tailwind blue-400
          dark: '#2563EB',  // Tailwind blue-600
        },
        secondary: {
          DEFAULT: '#22C55E', // Tailwind green-500
          light: '#4ADE80', // Tailwind green-400
          dark: '#16A34A',  // Tailwind green-600
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}; 