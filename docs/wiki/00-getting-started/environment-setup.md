# 环境搭建

> 负责人: TODO | 最后更新: 2026-11-24

## 1. 基础环境

| 依赖   | 版本要求    | 说明                                        |
| ------ | ----------- | ------------------------------------------- |
| Node   | `=22.23.2`  | 见根 `package.json` engines，禁止随意升级   |
| pnpm   | `>=10.17.1` | 包管理器，preinstall 已限制 only-allow pnpm |
| Docker | TODO        | MySQL / 其他中间件（按实际填写）            |

## 2. 安装依赖

```bash
git clone <repo-url> && cd onepiece
pnpm install
```

## 3. 启动

| 场景         | 命令                           | 说明                              |
| ------------ | ------------------------------ | --------------------------------- |
| 一键启动全部 | `pnpm dev`                     | scripts/dev-all.mjs，统一终端输出 |
| 按应用启动   | `pnpm --filter <app-name> dev` | 见 02-apps 各文档                 |
| 后端         | TODO                           | app-nest 数据库连接配置位置       |

## 4. 环境变量

- `.env` / `.env.development` 位置与字段说明：TODO
- 端口分配表：TODO（建议在此登记，避免端口冲突）

## 5. 常见环境问题

- 依赖安装后本地包未链接：重跑 `pnpm install`
- 端口被占用：`pnpm kill-port [port]`（scripts/kill-port.mjs）
