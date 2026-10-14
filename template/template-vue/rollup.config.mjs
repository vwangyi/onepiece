import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import replace from '@rollup/plugin-replace';
import dotenv from 'dotenv';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import clear from 'rollup-plugin-clear';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import alias from '@rollup/plugin-alias';
import { fileURLToPath } from 'node:url';
import terser from '@rollup/plugin-terser';
import { visualizer } from 'rollup-plugin-visualizer';
import vue from 'rollup-plugin-vue';
import pkg from './package.json' with { type: 'json' };

export default ({ mode }) => {
  dotenv.config({
    path: fileURLToPath(new URL(`.env.${mode}`, import.meta.url))
  });

  return {
    input: 'src/main.ts',
    output: {
      dir: 'dist',
      format: 'esm',
      name: 'rollupDemo',
      sourcemap: true,
      entryFileNames: 'js/xx-[name]-[hash].js',
      chunkFileNames: 'js/chunk11-[name].[hash].js',
      // manualChunks: {
      //   react: ["react", "react-dom"],
      // },
      plugins: [terser()],
      globals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
      },
      paths: {
        'react': 'https://cdn.jsdelivr.net/npm/react@18.2.0/+esm',
        'react-dom': 'https://cdn.jsdelivr.net/npm/react-dom@18.2.0/+esm'
      }
    },

    external: ['react', 'react-dom'],
    plugins: [
      alias({
        entries: [
          {
            find: '@',
            replacement: fileURLToPath(new URL('src', import.meta.url))
          }
        ]
      }),
      nodeResolve({
        extensions: [
          '.ts',
          '.tsx',
          '.js',
          '.jsx',
          '.vue',
          '.mjs',
          '.json',
          '.css',
          '.scss'
        ]
      }),
      commonjs(),
      vue(),
      babel({
        // babelHelpers: 'runtime',
        babelHelpers: 'inline', // ← 从 'runtime' 改成 'inline'
        extensions: [
          '.mjs',
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.json',
          '.vue',
          '.scss'
        ],
        // exclude: 'node_modules/**',
        babelrc: false,
        configFile: './.babelrc.json',
        filter: id => {
          // 排除 node_modules
          if (id.includes('node_modules')) return false;
          // 排除 .vue 里的 style / template 虚拟模块
          if (/\.vue\?.*type=(style|template)/.test(id)) return false;
          // 只处理 js/ts/vue(script) 相关
          return /\.(js|jsx|ts|tsx|vue)(\?|$)/.test(id);
        }
      }),

      replace({
        'preventAssignment': true,
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        '__BUILD_TOOLS__': JSON.stringify('rollup'),
        '__APP_NODE_ENV__': JSON.stringify(process.env.NODE_ENV),
        '__APP_PORT__': JSON.stringify(process.env.PORT),
        '__ENV_VERSION__': JSON.stringify(process.env.ENV_VERSION),
        '__APP_VERSION__': JSON.stringify(pkg.version),
        '__VUE_OPTIONS_API__': true, // Vue3是否支持 Options API
        '__VUE_PROD_DEVTOOLS__': false, // Vue3生产环境是否启用 DevTools Vue 调试工具
        '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': false // 生产环境水合失败时 是否显示详细信息
      }),

      serve('dist'),
      livereload('src'),
      clear({ targets: ['dist'] }),
      postcss({
        extensions: ['.css'], // 将scss 解析成css
        extract: true, // 将css 提取到dist目录下
        modules: true // 增加css的模块化支持
      }),
      htmlTemplate({
        template: 'public/index.html',
        target: 'dist/index.html',
        attrs: ['type="module"']
      }),
      image(),
      visualizer()
    ]
  };
};
