/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  important: true,
  prefix: 'tw-',
  theme: {
    extend: {},
    colors: {},
    container: {
      center: true,
      screens: {
        lg: '1024',
        xl: '1024'
      },
      padding: '2rem'
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
}
