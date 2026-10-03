import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import pkg from './package.json' with { type: 'json' };

const cwd = process.cwd();

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, cwd, '');

  console.log('env', typeof env.PORT, env.PORT);
  return {
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
    },
    define: {
      __BUILD_TOOLS__: JSON.stringify('vite'),
      __APP_NODE_ENV__: JSON.stringify(env.NODE_ENV),
      __APP_PORT__: JSON.stringify(env.PORT),
      __ENV_VERSION__: JSON.stringify(env.ENV_VERSION),
      __APP_VERSION__: JSON.stringify(pkg.version),
      __VUE_OPTIONS_API__: true, // Vue3是否支持 Options API
      __VUE_PROD_DEVTOOLS__: false, // Vue3生产环境是否启用 DevTools Vue 调试工具
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false // 生产环境水合失败时 是否显示详细信息
    },
    plugins: [
      vue(),
      vueJsx(),
      env.NODE_ENV === 'development' ? vueDevTools() : false
    ].filter(Boolean),

    server: {
      port: Number(env.PORT),
      open: env.OPEN === 'true',
      strictPort: false, // 端口被占用时自动尝试下一个
      proxy: {
        '/api': {
          target: String(env.BASE_URL), // 后端 NestJS 默认端口
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        },
        // /socket.io这个key值是socket.io这个库决定的
        '/socket.io': {
          target: String(env.BASE_URL),
          changeOrigin: true,
          ws: true // 关键：支持 WebSocket 升级
        }
      }
    }
  };
});
