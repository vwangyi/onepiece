# 微前端架构（qiankun）

> 负责人: TODO | 最后更新: 2026-11-24

## 1. 应用清单

| 应用              | 角色              | 端口 | activeRule | 产物形态                  |
| ----------------- | ----------------- | ---- | ---------- | ------------------------- |
| app-main-qiankun2 | 主应用（webpack） | 4000 | —          | 基座                      |
| app-micro-datav   | 子应用（webpack） | 5020 | `/datav`   | UMD（library: datav-app） |
| app-micro-react   | 子应用            | TODO | TODO       | TODO                      |
| app-micro-vue     | 子应用            | TODO | TODO       | TODO                      |

## 2. 核心约定（踩坑沉淀，勿改）

- **子应用必须以 UMD 导出生命周期**，且 `output.library.name` 与主应用 `registerMicroApps` 的 `name` 一致，否则报
  `You need to export lifecycle functions in xxx entry`
- **Vite 子应用必须接 `vite-plugin-qiankun`**（qiankun 2.x 无法执行原生 ESM），参考 `docs/supply-chain/apps/settlement-app`
- **子应用挂载点要用 `props.container.querySelector('#app')`**，不能直接 `document.querySelector('#app')`，否则命中主应用根节点
- **activeRule 不带尾斜杠**（qiankun 按 `pathname.startsWith` 匹配），主应用 catch-all 路由要放最后
- 主应用 `start()` 必须在 `app.mount` + `nextTick` 之后，保证容器已存在
- 端口固定：`devServer.port` / `server.port` 一律 `strictPort`，随机漂移会让 entry 失配

## 3. 主应用注册流程

```
router.isReady() → app.mount('#app') → nextTick → setupQiankun()
（src/app/micro-apps.js）
```

## 4. 公共依赖策略

- vue / vue-router / qiankun 归属与 externals 方案：TODO
- 样式隔离（沙箱 / strictStyleIsolation）：TODO
- 应用间通信（initGlobalState / props）：TODO
