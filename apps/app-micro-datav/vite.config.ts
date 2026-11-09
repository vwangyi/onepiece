import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5174, // 固定端口，和基座entry对应
    origin: '//localhost:5174',
  },
  build: {
    target: 'esnext',
  },
});
