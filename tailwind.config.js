/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Inter', 'Roboto', 'sans-serif'],
    },
    extend: {
      colors: {
        'background': {
          DEFAULT: '#E8FFED',
          dark: '#213228',
        },
        'emphasis': {
          DEFAULT: '#17452C',
          dark: '#1CD666',
        },
        'accent': {
          DEFAULT: '#20956A',
          dark: '#17452C',
        },
        'text': {
          DEFAULT: '#1D1E19',
          dark: '#E7FFFC',
        },
      },
    },
  },
  plugins: [],
}
