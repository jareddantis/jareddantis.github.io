/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    fontFamily: {
      sans: ['Inter', 'Roboto', 'sans-serif'],
    },
    extend: {
      colors: {
        'background': {
          DEFAULT: '#E8FFED',
          dark: '#172221',
        },
        'emphasis': {
          DEFAULT: '#17452C',
          dark: '#2ABF66',
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
