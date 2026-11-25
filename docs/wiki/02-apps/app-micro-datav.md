# app-micro-datav（datav 子应用）

> 负责人: TODO | 最后更新: 2026-11-24

## 1. 职责与边界

- 承接主应用 `/datav` 路由的数据可视化页面
- 可独立运行（`http://localhost:5020`）

## 2. 技术栈

Vue 3 + Vue Router + qiankun + webpack 5

## 3. 启动

```bash
pnpm --filter app-micro-datav dev   # http://localhost:5020
pnpm kill-port 5020                 # 端口被占用时先清理
```

## 4. qiankun 接入要点

| 文件                      | 要点                                                                                            |
| ------------------------- | ----------------------------------------------------------------------------------------------- |
| `webpack.config.cjs`      | `library: { name: 'datav-app', type: 'umd' }`，name 必须与主应用一致；`chunkLoadingGlobal` 唯一 |
| `src/app/main.js`         | 导出 bootstrap/mount/unmount；挂载用 `props.container.querySelector('#app')`                    |
| `src/app/public-path.js`  | qiankun 环境下运行时修正 `__webpack_public_path__`，异步 chunk 才不会 404                       |
| `src/app/router/index.js` | browser history，`/` 与 catch-all 都重定向到 `/datav/list`                                      |

## 5. 路由清单

| 路由          | 页面 |
| ------------- | ---- |
| `/datav/list` | home |

## 6. 已知问题 / TODO

- TODO
