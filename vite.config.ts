import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/evently_front/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'), // Set up path alias for `@` to `./src/`
      'components': path.resolve(__dirname, './src/components/'),
      'public': path.resolve(__dirname, './public/'),
      'pages': path.resolve(__dirname, './src/pages'),
      'types': path.resolve(__dirname, './src/@types'),
    },
  },
});
