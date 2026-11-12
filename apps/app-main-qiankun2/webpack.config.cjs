const path = require('node:path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/app/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    port: 4000,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
              transpileOnly: true, // ts-loader只做编译，不做类型检查
              appendTsSuffixTo: [/\.vue$/],
              appendTsxSuffixTo: [/\.vue$/],
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    // ForkTsCheckerWebpackPlugin 只做类型检查,不做编译
    new ForkTsCheckerWebpackPlugin({
      async: process.env.NODE_ENV === 'development',
      typescript: { configFile: path.resolve(__dirname, 'tsconfig.json') },
    }),
  ],
};
