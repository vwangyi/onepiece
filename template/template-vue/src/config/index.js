/**
 * 通常我们不会在业务代码中直接使用 process.env，
 * 而是集中在一个 config 模块中读取并导出结构化对象。
 */
import defaultConfig from './config.default.js';

const env = __APP_NODE_ENV__ || 'development';
let envConfig = {};

try {
  envConfig = await import(`./config.${env}.js`);
} catch (error) {
  console.error(`No config file found for environment: ${env}, using defaults`);
}

export default {
  ...defaultConfig,
  ...envConfig.default
};
