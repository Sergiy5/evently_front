import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  build: {
    outDir: 'dist', // Ensure Vite outputs to the `dist` folder
    sourcemap: true, // Optional: Generate source maps for debugging
    rollupOptions: {
      input: path.resolve(__dirname, 'src/main.tsx'), // Specify the main entry point
      output: {
        dir: 'dist', // Make sure all output files go to `dist`
        format: 'es', // ES module format
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'), // Set up path alias for `@` to `./src/`
      components: path.resolve(__dirname, './src/components/'),
      public: path.resolve(__dirname, './public/'),
      pages: path.resolve(__dirname, './src/pages'),
      types: path.resolve(__dirname, './src/@types'),
    },
  },
});


// export default defineConfig({
//   build: {
//     outDir: 'build', // Adjust to your output directory
//   },
//   plugins: [react()],
//   css: {
//     postcss: './postcss.config.js',
//   },
//   base: '/evently_front/',
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src/'),
//       'components': path.resolve(__dirname, './src/components/'),
//       'public': path.resolve(__dirname, './public/'),
//       'pages': path.resolve(__dirname, './src/pages'),
//       'types': path.resolve(__dirname, './src/@types'),
//     },
//   },
// });

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import path from 'path';

// export default defineConfig({
//   build: {
//     outDir: 'build',
//   },
//   plugins: [react()],
//   css: {
//     postcss: './postcss.config.js',
//   },
//   base: '/evently_front/',
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src/'),
//       components: `${path.resolve(__dirname, './src/components/')}`,
//       public: `${path.resolve(__dirname, './public/')}`,
//       pages: path.resolve(__dirname, './src/pages'),
//       types: `${path.resolve(__dirname, './src/@types')}`,
//     },
//   },
// });
