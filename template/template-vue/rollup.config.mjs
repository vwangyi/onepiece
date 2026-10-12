import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import replace from '@rollup/plugin-replace';
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

export default {
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
      extensions: ['.mjs', '.js', '.json', '.node', '.ts', '.tsx', '.vue']
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
      'process.env.NODE_ENV': JSON.stringify('production'),
      '__BUILD_TOOLS__': JSON.stringify('rollup'),
      '__APP_NODE_ENV__': JSON.stringify(env.NODE_ENV),
      '__APP_PORT__': JSON.stringify(env.PORT),
      '__ENV_VERSION__': JSON.stringify(env.ENV_VERSION),
      '__APP_VERSION__': JSON.stringify(pkg.version),
      '__VUE_OPTIONS_API__': JSON.stringify(true),
      '__VUE_PROD_DEVTOOLS__': JSON.stringify(false),
      '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': JSON.stringify(false)
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
