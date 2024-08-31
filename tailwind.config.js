/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
      extend: {
          backgroundImage: {
              'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
              'gradient-conic':
                  'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
          },
          fontFamily: {
              base: [
                  'DM Sans',
                  'DM Sans fallback',
                  'ui-sans-serif',
                  'system-ui',
                  '-apple-system',
                  'BlinkMacSystemFont',
                  'Segoe UI',
                  'Roboto',
                  'Helvetica Neue',
                  'Arial',
                  'Noto Sans',
                  'sans-serif',
                  'Apple Color Emoji',
                  'Segoe UI Emoji',
                  'Segoe UI Symbol',
                  'Noto Color Emoji',
              ],
              poppins: ['Poppins', 'sans-serif'],
          },
          colors: {
              primary: 'black',
              secondary: {
                  100: '#E2E2D5',
                  200: '#888883',
              },
              darker: '#020420',
              primaryDark: '#1d935e',
              code: '#9cdcfe',
          },
          boxShadow: {
              processCard: '5px 5px 15px 0px #98b7fa96 ',
          },
          animation: {
              'fade-in': 'fadeIn 0.5s ease-out',
              'zoom-out': 'zoomOut 0.5s ease-out',
          },
      },
  },
  plugins: [require('@tailwindcss/forms')],
};
