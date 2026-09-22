import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  root: 'mobile',
  base: '/',
  plugins: [tsconfigPaths({ root: '..' }), tailwindcss(), react(), VitePWA({injectRegister:null,manifest:false,devOptions:{enabled:false}})],
  build: {
    outDir: '../dist/mobile',
    emptyOutDir: true,
  },
});