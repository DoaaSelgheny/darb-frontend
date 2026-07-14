/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}', "./node_modules/tw-elements/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: '#0B7A75',
        secondary: '#0b7a75',
        greyBg: '#FAFAFA',
        greyBlack: '#393939',
        primaryLight: '#FDF1F1',
        secondaryLight: '#F1F3F9',
        greyDark: '#969696',
        danger: '#F35252',
        neutral60: '#A7AEB5',
        dark: '#1E1E1E',
        'gray-600': '#666',
        success: '#1B998B',
        warning: '#FFC62A',
        blackTxt:'#262626',
        heritage: {
          DEFAULT: '#D4A55A',
          dark: '#B08A4A',
          light: '#F5E6CC',
        },
        navy: {
          DEFAULT: '#1F2937',
          light: '#374151',
        },
      },
      screens: {},
      fontFamily: {
        Rubik: 'Rubik',
        naskh: ['"Noto Naskh Arabic"', 'serif'],
      },
      boxShadow: {
        greyBox: '0px 3px 30px rgba(226, 226, 226, 0.16)',
        greyLightBox: '0px 3px 20px 0px rgba(240, 239, 239, 0.25)',
      },
    },
  },
  plugins: [require('autoprefixer'),require("tw-elements/plugin.cjs")],
};

