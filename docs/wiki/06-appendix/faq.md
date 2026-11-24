# FAQ

> 只放"一问一答"式短内容；涉及排查过程的移入 `05-operations/troubleshooting.md`。

## 环境

- **Q: pnpm install 报 only-allow pnpm？** 根 package.json 强制 pnpm，不要用 npm/yarn。
- **Q: Node 版本不符？** 固定 22.23.2（engines 约束），用 nvm/volta 切换。

## 微前端

- **Q: 子应用样式污染主应用？** TODO（沙箱 / strictStyleIsolation 方案待定）
- **Q: 子应用间如何跳转？** TODO（统一通过主应用路由 + activeRule）

## 其他

- **Q: 新增共享包后 IDE 找不到模块？** 重跑 `pnpm install` 并重启 TS Server。
