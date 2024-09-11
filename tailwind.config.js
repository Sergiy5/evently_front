/** @type {import('tailwindcss').Config} */


export default {
  mode: 'jit',
  content: [
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.ts',
    './src/**/*.tsx',
  ],
  theme: {
    extend: {
      // Change variables for colors here...
      colors: {
        secondary: '#f1c40f',
        success: '#3BE660',
        error: '#FF0F00',
        warning: '#f7dc6f',
        dark: '#333',
        light: '#f9f9f9',
        borderColor: '#E8EAEC',
        formBgColor: '#E2DEFF',
        buttonColor: '#9B8FF3',
        bgColor: '#F8FBFF',
        textDark: '#062341',
        darkGray: '#D0D5D8',
      },
      // spacing: {
      //   sm: '8px',
      //   md: '16px',
      //   lg: '24px',
      //   xl: '32px',
      // },
      typography: {
        fontFamily: {
          sans: ['Open Sans', 'sans-serif'],
          serif: ['Merriweather', 'serif'],
        },
        fontSize: {
          xs: '12px',
          sm: '14px',
          md: '16px',
          lg: '18px',
          xl: '20px',
        },
      },
    },
  },
  // variants: {
  //   // Expample of using tailwindcss dark mode
  //   // extend: {
  //   //   backgroundColor: ['dark'],
  //   // },
  // },
  plugins: [],
};
