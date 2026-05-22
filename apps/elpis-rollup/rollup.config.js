/**
 * node 12+ 也支持 esm 但需要 package.json中 type: 'module" 或文件名为 .mjs
 */
import { defineConfig } from 'rollup';

export default defineConfig({
  input: 'src/index.js',
  output: [
    {
      file: 'dist/bundle-iife.js',
      format: 'iife'
    },
    {
      file: 'dist/bundle-esm.js',
      format: 'esm'
    },
    {
      file: 'dist/bundle-cjs.js',
      format: 'cjs'
    },
    {
      file: 'dist/bundle-umd.js',
      format: 'umd',
      name: 'bundle'
    }
  ]
});

// export default defineConfig([
//   {
//     input: './src/index.js',
//     output: {
//       dir: 'dist/esm',
//       format: 'esm'
//     }
//   },
//   {
//     input: './src/util.js',
//     output: {
//       dir: 'dist/iife',
//       format: 'iife',
//       name: 'bundle'
//     }
//   }
// ]);
