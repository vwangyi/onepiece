// pnpm i @vue/babel-plugin-jsx @vue/babel-preset-jsx @babel/preset-env -D
module.exports = {
  presets: [
    '@babel/preset-env', // 支持最新的 JavaScript 语法
    '@babel/preset-typescript', // ← 必须有
    '@vue/babel-preset-jsx' // 添加 Vue JSX 支持
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3
      }
    ],
    '@vue/babel-plugin-jsx' // 使用 Vue JSX 插件
  ]
};
