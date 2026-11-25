# 故障排查记录

> 约定：一次排查 = 一条记录，追加到本文件末尾，不要另开文件。

## 模板

```
### [日期] 标题
- 现象：
- 根因：
- 解决：
- 预防：
```

---

### [2026-11-13] 子应用加载失败：You need to export lifecycle functions

- 现象：主应用访问 `/datav/list`，容器内只有空 `#app`，控制台
  `application 'datav-app' died in status LOADING_SOURCE_CODE`
- 根因：子应用 webpack `output` 未配置 UMD library，生命周期导出被丢弃
- 解决：`library: { name: 'datav-app', type: 'umd' }`，name 与主应用 `registerMicroApps` 一致
- 预防：新子应用上线前按 `01-architecture/micro-frontend.md` 核对清单

### [2026-11-13] 子应用挂载成功但白屏

- 现象：`[VUE_ROUTER_R0004] No match found for location with path "/"`
- 根因：子应用只有 `/datav/list` 一条路由且无 `/` 重定向
- 解决：router 增加 `/` 与 catch-all 重定向

### [2026-11-13] 端口 5020 被占用，webpack-dev-server 起不来

- 现象：EADDRINUSE
- 根因：上次 dev server 未退出
- 解决：`pnpm kill-port 5020`（scripts/kill-port.mjs，先 SIGTERM 超时 SIGKILL）
- 预防：各应用 devServer 固定端口

### [2026-11-09] Vite 子应用接 qiankun 报语法错误

- 现象：子应用脚本无法执行，生命周期未注册
- 根因：qiankun 2.x (import-html-entry) 无法执行 Vite 原生 ESM 产物
- 解决：接 `vite-plugin-qiankun` + `renderWithQiankun`，参考 `apps/finance-app`、`docs/supply-chain/apps/settlement-app`
