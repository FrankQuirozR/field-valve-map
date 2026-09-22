import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  root: 'mobile',
  base: '/',
  plugins: [tsconfigPaths({ root: '..' }), tailwindcss(), react()],
  build: {
    outDir: '../dist/mobile',
    emptyOutDir: true,
  },
});