/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      minHeight: {
        '0': '0',
        '64': '16rem',
        'full': '100%',
      }
    },
  },
  plugins: [],
}
