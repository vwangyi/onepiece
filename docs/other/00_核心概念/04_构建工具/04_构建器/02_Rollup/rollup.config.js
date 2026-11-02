import { defineConfig } from 'rollup';

export default defineConfig({
    input: ['src/index.js', 'src/main.js'],
    output: {
        dir: 'dist', // 多入口时 output.dir 指定一个目录就行
        format: 'esm',
        name: 'bundle'
    }
})