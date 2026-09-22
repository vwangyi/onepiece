/**
 * 全局类型声明：
 * 1. .vue 单文件组件模块
 * 2. webpack DefinePlugin 注入的业务全局常量（见 webpack.config.js）
 * 3. Vue3 特性开关（Vue 官方要求的编译期常量）
 * 4. 静态资源模块（webpack asset modules）
 */

/* ---------------- 1. Vue SFC ---------------- */
declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  // 单文件组件默认导出的组件实例（更精确的类型由 vue-tsc 推导）
  const component: DefineComponent<object, object, unknown>;
  export default component;
}

/* ---------------- 2. 业务全局常量（DefinePlugin 注入） ---------------- */
/** 构建环境：'development' | 'production' | 'test'，对应 .env.[mode] 文件 */
declare const __APP_NODE_ENV__: string;
/** 服务端口（来自 .env.[mode] 的 PORT） */
declare const __APP_PORT__: string;
/** 应用版本号（取自 package.json 的 version） */
declare const __APP_VERSION__: string;

/* ---------------- 3. Vue3 编译期特性开关 ---------------- */
/** 是否包含 Options API 支持 */
declare const __VUE_OPTIONS_API__: boolean;
/** 生产环境是否启用 DevTools */
declare const __VUE_PROD_DEVTOOLS__: boolean;
/** 生产环境水合(hydration)失败时是否输出详细警告 */
declare const __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: boolean;

/* ---------------- 4. 静态资源（webpack asset modules） ---------------- */
declare module '*.jpeg' {
  const src: string;
  export default src;
}
declare module '*.jpg' {
  const src: string;
  export default src;
}
declare module '*.png' {
  const src: string;
  export default src;
}
declare module '*.gif' {
  const src: string;
  export default src;
}
declare module '*.svg' {
  const src: string;
  export default src;
}
declare module '*.webp' {
  const src: string;
  export default src;
}
declare module '*.ico' {
  const src: string;
  export default src;
}
declare module '*.woff' {
  const src: string;
  export default src;
}
declare module '*.woff2' {
  const src: string;
  export default src;
}
declare module '*.mp4' {
  const src: string;
  export default src;
}
declare module '*.mp3' {
  const src: string;
  export default src;
}
