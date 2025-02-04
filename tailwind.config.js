/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
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
