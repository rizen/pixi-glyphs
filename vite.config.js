import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'docs',
  base: '/',
  server: {
    port: 8888,
    open: true
  },
  build: {
    outDir: '../dist-docs',
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '/dist': resolve(__dirname, 'dist')
    }
  }
});