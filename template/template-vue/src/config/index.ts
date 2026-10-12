/**
 * 通常我们不会在业务代码中直接使用 构建工具 向 业务代码 注入的变量
 * 而是集中在一个 config 模块中读取并导出结构化对象。
 */
import defaultConfig from './config.default';
import devConfig from './config.development';
import prodConfig from './config.production';

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
  /** 构建工具 */
  BUILD_TOOLS: string;
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

const envConfig: Record<string, Partial<AppConfig>> = {
  development: devConfig,
  production: prodConfig
};
const env = __APP_NODE_ENV__ || 'development';

const config: AppConfig = {
  ...defaultConfig,
  ...envConfig[env],
  APP_VERSION: env === 'production' ? __APP_VERSION__ : __ENV_VERSION__
};

export default config;
