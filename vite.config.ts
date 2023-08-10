import react from '@vitejs/plugin-react-swc';
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';
import svg from 'vite-plugin-svgo';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/parallax-chess',
  plugins: [react(), svg(), glsl()],
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
    ],
  },
});
