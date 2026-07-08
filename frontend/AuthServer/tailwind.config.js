/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#0B7A75',
        secondary: '#122466',
        greyBg: '#FAFAFA',
        greyBlack: '#393939',
        primaryLight: '#FDF1F1',
        secondaryLight: '#F1F3F9',
        greyDark: '#969696',
        darkBlack:'#262626',
        danger: '#F35252',
        neutral60: '#A7AEB5',
        dark: '#1E1E1E',
        'gray-600': '#666',
        btnBg:'#0B7A75',
        heritage: {
          DEFAULT: '#D4A55A',
          dark: '#B08A4A',
          light: '#F5E6CC',
        },
      },
      screens: {},
      fontFamily: {
        Rubik: 'Rubik',
        naskh: ['"Noto Naskh Arabic"', 'serif'],
      },
      boxShadow: {
        greyBox: '0px 3px 30px #DBDBDB29',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '2rem',
          sm: '2rem',
          lg: '4rem',
          xl: '4rem',
        '2xl': '6rem',
        },
      },
    },
  },
  plugins: [],
};
