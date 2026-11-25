# app-micro-vue（主业务应用，FSD）

> 负责人: TODO | 最后更新: 2026-11-24

## 1. 职责与边界

- 项目主业务前端，采用 Feature-Sliced Design 分层，由 steiger 约束

## 2. 技术栈

Vue 3 + Vue Router + Pinia + Vite（根 package.json 共享依赖）

## 3. 常用命令

```bash
pnpm vue:dev      # 启动
pnpm typecheck    # 类型检查
pnpm fsd:fix      # FSD 违规自动修复
```

## 4. FSD 分层说明

| 层              | 内容                   |
| --------------- | ---------------------- |
| app             | 初始化、全局 provider  |
| pages / widgets | 页面与区块             |
| features        | 用户行为（按功能切分） |
| entities        | 业务实体               |
| shared          | 无业务逻辑的基础设施   |

## 5. 路由与页面清单

## 6. 与其他应用的依赖关系

## 7. 环境变量与配置

## 8. 已知问题 / TODO
