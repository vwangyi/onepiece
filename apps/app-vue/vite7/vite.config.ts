import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import type { UserConfig, ConfigEnv, Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import path from 'node:path'
import { versionCheckPlugin } from './plugins/versionCheckPlugin';

const cwd = process.cwd();


// https://cn.vite.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  // 加载.env文件 不会使用node原生提供的process.env 而是用vite提供的import.meta.env
  const env = loadEnv(mode, cwd, ''); 
  
   

  return {
    root: path.resolve(cwd, './vite7'),
    // public 目录实际在项目根(app-vue/public)，不在 root(vite/) 下，需显式指定
    publicDir: path.resolve(cwd, './public'),
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
      alias: [
        // index.html 里 <script src="/src/main.ts"> 是相对 root(vite/) 的路径，
        // 而 src 实际在上一级目录，这里把 /src/ 映射到真实的 src 目录
        { find: /^\/src\//, replacement: fileURLToPath(new URL('../src/', import.meta.url)) },
        { find: '@', replacement: fileURLToPath(new URL('../src', import.meta.url)) },
        { find: '~', replacement: fileURLToPath(new URL('../src/views/DemoView', import.meta.url)) }
      ]
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
    // esbuild: {
    //   pure: Boolean(env.VITE_DROP_CONSOLE) ? ['console.log','debugger'] : []
    // },
     esbuild: {
      // 用于移除函数调用，如 console.log
pure: Boolean(env.VITE_DROP_CONSOLE) ? ['console.log']:[], 
// 用于移除语句，如 debugger
drop: Boolean(env.VITE_DROP_CONSOLE) ? ['debugger'] : []
    }
  };
});
