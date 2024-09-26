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
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        lora: ['Lora', 'serif'],
      },
      colors: {
        // Main color
        lightBlue: '#D7EBFF',
        lightPurple: '#E2DEFF',
        lightGreen: '#CFFFCF',
        lightPink: '#FFD6F7',
        buttonPurple: '#9B8FF3',
        hoverCard: '#F4F3FF',

        //Neutral color
        background: '#F8FBFF',
        lightGray: '#F4F4F4',
        gray: '#E8EAEC',
        darkGray: '#D0D5D8',
        textDark: '#062341',

        // Other color
        success: '#3BE660',
        error: '#FF0F00',
      },
      boxShadow: {
        primaryBtnActive: 'inset -5px 5px 50px 0 rgba(255, 255, 255, 0.7)',
        shadowPrimaryBtn: '-5px 5px 36.7px 0px rgba(0, 0, 0, 0.25) inset',
        shadowSecondaryBtn: `inset 0 0 9px 0 rgba(155, 143, 243, 1)`,
      },
      opacity: {
        disabled: '0.5',
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
          lato:['LatoRegular']
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
