# 项目目录结构

> 负责人: TODO | 最后更新: 2026-11-24

## 1. Monorepo 总览

```
onepiece/
├── apps/                    # 业务应用（每个目录独立 package）
│   ├── app-main-qiankun2/   # qiankun 主应用（webpack）
│   ├── app-micro-datav/     # datav 子应用（webpack）
│   ├── app-micro-react/     # React 子应用
│   ├── app-micro-vue/       # Vue 主业务应用（FSD 架构）
│   ├── app-nest/            # NestJS 后端服务
│   └── app-nuxt/            # Nuxt 应用
├── packages/                # 跨应用共享包（workspace:*）
│   ├── onepiece-utils/      # 工具库
│   ├── onepiece-api/        # 接口层
│   ├── onepiece-config/     # 通用配置
│   ├── onepiece-design(-vue/-react)  # 设计系统
│   ├── onepiece-entities/ onepiece-features/ onepiece-shared/ onepiece-types/
│   ├── onepiece-lib/ onepiece-cli/
├── docs/                    # VitePress 技术文档站 + 本 wiki
│   ├── wiki/                # 本项目 Wiki
│   └── supply-chain/        # 供应链微前端示例项目
├── scripts/                 # 仓库级脚本（dev-all、kill-port 等）
├── template/                # 脚手架模板
└── pnpm-workspace.yaml      # workspace 定义：apps/* packages/* docs
```

## 2. 约定

- 新增应用放 `apps/<app-name>`，必须登记到 `02-apps/` 文档
- 新增共享包放 `packages/<package-name>`，流程见 `03-packages/template-package.md`
- 仓库级工具脚本放 `scripts/`，并在根 `package.json` 注册 npm script

## 3. 单应用内部结构

- `app-micro-vue` 采用 FSD（Feature-Sliced Design），由 `steiger` 强约束：
  ```bash
  pnpm fsd        # 检查
  pnpm fsd:fix    # 自动修复
  ```
- 其他应用：TODO（按各自实际结构补充）
