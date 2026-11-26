import { fileURLToPath, URL } from 'node:url';
import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import type { UserConfig, ConfigEnv, Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import pkg from './package.json' with { type: 'json' };
import svgLoader from 'vite-svg-loader';

const cwd = process.cwd();

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, cwd, '');

  return {
    esbuild: {
      // 用于移除函数调用，如 console.log
      pure: env.VITE_DROP_CONSOLE === 'true' ? ['console.log'] : [],
      // 用于移除语句，如 debugger
      drop: env.VITE_DROP_CONSOLE === 'true' ? ['debugger'] : [],
    },
    define: {
      __BUILD_TOOLS__: JSON.stringify('vite'),
      __APP_NODE_ENV__: JSON.stringify(env.NODE_ENV),
      __APP_PORT__: JSON.stringify(env.PORT),
      __ENV_VERSION__: JSON.stringify(env.ENV_VERSION),
      __APP_VERSION__: JSON.stringify(pkg.version),
      __VUE_OPTIONS_API__: true, // Vue3是否支持 Options API
      __VUE_PROD_DEVTOOLS__: false, // Vue3生产环境是否启用 DevTools Vue 调试工具
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false, // 生产环境水合失败时 是否显示详细信息
    },
    resolve: {
      extensions: ['.vue', '.ts', '.jsx', '.tsx', '.js', '.mjs', '.json'],
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '~': fileURLToPath(new URL('./src/views/DemoView', import.meta.url)),
      },
    },
    plugins: [
      svgLoader({
        defaultImport: 'url', // 关键：默认作为 URL 处理，避免 img 标签报错
      }),
      vue(),
      vueJsx(),
      false ? vueDevTools() : false,
    ].filter(Boolean),
    worker: {
      // 必须用 ES module 格式的 Worker。
      // 原因：图像处理 Worker 里通过 `?url` 动态引入 OpenCV（12MB 的 UMD 文件），
      // 这会让 Worker 入口产生代码分割，而 Vite 默认的 iife 格式不支持分割。
      format: 'es',
    },
    server: {
      port: Number(env.VITE_PORT),
      open: env.VITE_OPEN === 'true',
      proxy: {
        '/api': {
          target: String(env.VITE_BASE_URL), // 后端 NestJS 默认端口
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
        // /socket.io这个key值是socket.io这个库决定的
        '/socket.io': {
          target: String(env.VITE_BASE_URL),
          changeOrigin: true,
          ws: true, // 关键：支持 WebSocket 升级
        },
      },
    },
  };
});
