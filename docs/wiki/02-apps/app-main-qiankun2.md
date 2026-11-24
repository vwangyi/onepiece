# app-main-qiankun2（qiankun 主应用）

> 负责人: TODO | 最后更新: 2026-11-24

## 1. 职责与边界

- 基座：登录壳、导航、qiankun 注册与路由分发
- 不承载业务逻辑，业务都在子应用

## 2. 技术栈

Vue 3 + Vue Router + qiankun + webpack 5（vue-loader）

## 3. 启动

```bash
pnpm --filter app-main-qiankun2 dev   # http://localhost:4000
```

## 4. 关键文件

| 文件                          | 作用                                                            |
| ----------------------------- | --------------------------------------------------------------- |
| `src/app/micro-apps.js`       | 子应用清单、registerMicroApps、start                            |
| `src/app/main.js`             | 启动时序：mount → nextTick → setupQiankun                       |
| `src/app/router/index.js`     | `/` 首页、`/datav/:pathMatch(.*)*` 子应用路由、catch-all 重定向 |
| `src/pages/home/ui/index.vue` | `#subapp-viewport` 容器所在页                                   |
| `webpack.config.cjs`          | devServer 4000、historyApiFallback、CORS                        |

## 5. 已知问题 / TODO

- TODO
