import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  build: {
    outDir: 'build', // Adjust to your output directory
  },
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  base: '/evently_front/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      components: path.resolve(__dirname, './src/components/'),
      public: path.resolve(__dirname, './public/'),
      pages: path.resolve(__dirname, './src/pages'),
      types: path.resolve(__dirname, './src/@types'),
    },
  },
});

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
