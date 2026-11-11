const path = require('node:path');

export default {
  entry: './src/app/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    port: 4000,
  },
};
