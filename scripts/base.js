import path from 'node:path';
import URL from 'node:url';
import fs from 'node:fs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import vue from '@vitejs/plugin-vue';
import postcss from 'rollup-plugin-postcss';

const __filename = URL.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const clearDist = packageName => {
  const dist = path.resolve(__dirname, '../packages', packageName, 'dist');
  if (fs.existsSync(dist)) {
    fs.rmSync(dist, { recursive: true, force: true });
  }
};

const packages = ['onepiece-utils', 'onepiece-api'];

// 获取所有子包的绝对路径
function getPackageRoots() {
  return packages.map(pkg => path.resolve(__dirname, '../packages', pkg));
}

// 读取子包的 package.json
async function packageJson(root) {
  const jsonPath = path.resolve(root, 'package.json');
  const content = await fs.promises.readFile(jsonPath, 'utf-8');
  return JSON.parse(content);
}

// getRollupConfig 为每个子包 生成 rollup配置
async function getRollupConfig(root) {
  const config = await packageJson(root);
  const tsconfig = path.resolve(root, 'tsconfig.json');
  const { name, formats } = config.buildOptions || {};
  const dist = path.resolve(root, './dist');
  const entry = path.resolve(root, './src/index.ts');
  const rollupOptions = {
    input: entry,
    sourcemap: true,
    external: ['vue', 'axios'], // 排除vue 由宿主提供
    plugins: [
      nodeResolve(),
      commonjs(),
      json(),
      typescript({
        tsconfig,
        // 官方插件（rollup 4 兼容，持续维护）。这里必须显式关掉 noEmit：
        // 根 tsconfig 为了给 apps 做纯类型检查设了 noEmit:true，会被继承下来，
        // 导致插件 emit 不出任何代码，TS 源码被原样交给 rollup 解析报 PARSE_ERROR。
        noForceEmit: true,
        compilerOptions: {
          noEmit: false,
          outDir: dist,
          declaration: true,
          declarationDir: dist,
          sourceMap: true
        }
      }),
      vue(),
      postcss()
    ],
    dir: dist
  };
  const output = [];
  for (const format of formats) {
    const outputItem = {
      format,
      file: path.resolve(dist, `index.${format}.js`),
      sourcemap: true,
      globals: {
        vue: 'Vue'
      }
    };
    if (format === 'iife') {
      // 包名里的 `-` 不是合法 JS 标识符，需要转成驼峰
      outputItem.name = name.replace(/[^a-zA-Z0-9_$]+(.)?/g, (_, c) =>
        c ? c.toUpperCase() : ''
      );
    }
    output.push(outputItem);
  }
  rollupOptions.output = output;
  // watch options
  rollupOptions.watch = {
    include: path.resolve(root, 'src/**'),
    exclude: path.resolve(root, 'node_modules/**'),
    clearScreen: false
  };
  return rollupOptions;
}

export async function getRollupConfigs() {
  const roots = getPackageRoots();
  const configs = await Promise.all(roots.map(getRollupConfig));
  const result = {};
  for (let i = 0; i < packages.length; i++) {
    result[packages[i]] = configs[i];
  }
  return result;
}
