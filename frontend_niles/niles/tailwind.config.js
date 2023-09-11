/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem'
      },
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1200px'
      }
    },
    extend: {},
  },
  plugins: [
    require('preline/plugin'),
  ],
}