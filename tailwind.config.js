/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        coral: {
          50:  '#fff2f0',
          100: '#ffe1dc',
          200: '#ffc7be',
          300: '#ff9f90',
          400: '#ff6b58',
          500: '#f94332',
          600: '#e72518',
          700: '#c21a0f',
          800: '#a01a10',
          900: '#841c13',
        },
      },
      fontFamily: {
        sans:    ['"DM Sans"', 'sans-serif'],
        display: ['"Syne"',    'sans-serif'],
      },
    },
  },
  plugins: [],
}
