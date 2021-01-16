module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minHeight: {
        '0': '0',
        '64': '16rem',
        'full': '100%',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
