/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './*.html',
    './blogs/*.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        accent: '#7c3aed',
        accentLight: '#a78bfa',
      },
      keyframes: {
        blob: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%':     { transform: 'translate(30px,-50px) scale(1.1)' },
          '66%':     { transform: 'translate(-20px,20px) scale(0.9)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        spinSlow: {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        blob:     'blob 9s infinite',
        fadeUp:   'fadeUp 0.7s ease forwards',
        shimmer:  'shimmer 3s ease infinite',
        spinSlow: 'spinSlow 20s linear infinite',
      },
    },
  },
  plugins: [],
};
