/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.html',   // catch popup.html and any other HTML
    './**/*.js'      // catch popup.js, teleport.js, etc.
  ],
  safelist: [
    'bg-blue-600',
    'text-white',
    'text-gray-700',
    'bg-gray-100',
    'rounded-lg',
    'hidden'
  ],
  theme: {
    extend: {
      // you can add custom colors or fonts here later
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
