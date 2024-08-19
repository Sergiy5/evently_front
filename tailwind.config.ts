/** @type {import('tailwindcss').Config} */


module.exports = {
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
        primary: '#3498db',
        secondary: '#f1c40f',
        success: '#2ecc71',
        error: '#e74c3c',
        warning: '#f7dc6f',
        dark: '#333',
        light: '#f9f9f9',
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
