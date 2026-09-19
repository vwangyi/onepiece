import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import type { UserConfig, ConfigEnv, Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import path from 'node:path'
import { versionCheckPlugin } from './vite7/plugins/versionCheckPlugin';

const cwd = process.cwd();


// https://cn.vite.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  // 加载.env文件 不会使用node原生提供的process.env 而是用vite提供的import.meta.env
  const env = loadEnv(mode, cwd, ''); 
  
   
  return { 
     esbuild: {
      // 用于移除函数调用，如 console.log
pure: Boolean(env.VITE_DROP_CONSOLE) ? ['console.log']:[], 
// 用于移除语句，如 debugger
drop: Boolean(env.VITE_DROP_CONSOLE) ? ['debugger'] : []
    },  
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '~': fileURLToPath(new URL('./src/views/DemoView', import.meta.url)),
      }, 
    },
    plugins: [
      versionCheckPlugin(),
      vue(),
      vueJsx(),
      false ? vueDevTools() : false,
    ].filter(Boolean),
    server: {
      port: Number(env.VITE_PORT),
      open: Boolean(env.VITE_OPEN),
      proxy: {
        '/api': {
          target: env.VITE_BASE_URL || 'http://localhost:1234', // 后端 NestJS 默认端口
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        },
        // /socket.io这个key值是socket.io这个库决定的
        '/socket.io': {
          target: env.VITE_BASE_URL || 'http://localhost:1234',
          changeOrigin: true,
          ws: true // 关键：支持 WebSocket 升级
        }
      }
    },
  };
});
