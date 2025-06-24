/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6', // Tailwind blue-500
          light: '#60A5FA', // Tailwind blue-400
          dark: '#2563EB', // Tailwind blue-600
        },
        secondary: {
          DEFAULT: '#22C55E', // Tailwind green-500
          light: '#4ADE80', // Tailwind green-400
          dark: '#16A34A', // Tailwind green-600
        },
        accent: {
          pink: '#EC4899',
          yellow: '#FBBF24',
          purple: '#A78BFA',
          teal: '#14B8A6',
        },
        background: {
          light: '#f0fdf4',
          dark: '#1e293b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 24px 0 rgba(60,72,88,0.08)',
        accent: '0 2px 8px 0 rgba(59,130,246,0.15)',
      },
      borderRadius: {
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
    },
  },
  plugins: [],
};
