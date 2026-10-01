/**
 * 通常我们不会在业务代码中直接使用 构建工具 向 业务代码 注入的变量
 * 而是集中在一个 config 模块中读取并导出结构化对象。
 */
import defaultConfig from './config.default.ts';

/** 应用配置的形状：各环境配置文件与默认配置都应满足（可部分覆盖） */
export interface AppConfig {
  /** 环境名称描述 */
  NAME: string;
  /** 服务端口 */
  PORT: string;
  /** 构建环境 */
  NODE_ENV: string;
  /** 应用版本号 */
  APP_VERSION: string;
}

/**
 * Partial<T> 是 TypeScript 内置的一个工具类型（Utility Type），作用是把类型 T 的所有属性变成可选的。
 * 
 *  type Partial<T> = {
      [P in keyof T]?: T[P];
    };
     keyof T：取出 T 的所有属性名。

    [P in keyof T]：遍历这些属性名。

    ?：把每个属性标记为可选。

    T[P]：保留原来的属性类型。
 */

const env = __APP_NODE_ENV__ || 'development';
let envConfig: { default: Partial<AppConfig> } = { default: {} };

try {
  envConfig = await import(`./config.${env}.ts`);
} catch (error) {
  console.error(`No config file found for environment: ${env}, using defaults`);
}

const config: AppConfig = {
  ...defaultConfig,
  ...envConfig.default,
  APP_VERSION: env === 'production' ? __APP_VERSION__ : __ENV_VERSION__
};

export default config;
