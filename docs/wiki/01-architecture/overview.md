# 总体架构

> 负责人: TODO | 最后更新: 2026-11-24

## 1. 架构图

```
TODO: 放置架构图（Excalidraw / drawio 截图）
```

## 2. 分层说明

| 层         | 内容                                                |
| ---------- | --------------------------------------------------- |
| 微前端基座 | app-main-qiankun2（webpack，qiankun 注册/路由分发） |
| 子应用     | app-micro-datav / app-micro-react / app-micro-vue   |
| 后端       | app-nest（NestJS + TypeORM + MySQL + JWT）          |
| 共享层     | packages/*（utils、api、design、types…）            |

## 3. 关键决策记录（ADR）

| 日期 | 决策                                  | 原因                             | 状态   |
| ---- | ------------------------------------- | -------------------------------- | ------ |
| TODO | 示例：子应用产物使用 UMD 导出生命周期 | qiankun 通过全局变量获取生命周期 | 已落地 |

## 4. 相关文档

- 微前端细节：[micro-frontend.md](./micro-frontend.md)
- 后端细节：[backend.md](./backend.md)
