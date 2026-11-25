# 常用命令速查

> 负责人: TODO | 最后更新: 2026-11-24

## 1. 根目录

| 命令                          | 作用                            |
| ----------------------------- | ------------------------------- |
| `pnpm dev`                    | 一键启动开发环境（dev-all.mjs） |
| `pnpm typecheck`              | app-micro-vue 类型检查          |
| `pnpm lint` / `pnpm prettier` | 代码检查 / 格式化               |
| `pnpm spell`                  | cspell 拼写检查                 |
| `pnpm test`                   | vitest                          |
| `pnpm fsd[:fix][:watch]`      | FSD 架构约束检查                |
| `pnpm commit`                 | cz-git 交互式提交               |
| `pnpm kill-port [port...]`    | 杀掉占用端口的进程（默认 5020） |

## 2. 按应用

```bash
pnpm --filter <app-name> dev      # 启动
pnpm --filter <app-name> build    # 构建
pnpm --filter <app-name> exec tsc --noEmit   # 单应用类型检查
```

## 3. 提交与钩子

- husky precommit → lint-staged
- commitlint 规则见 `commitlint.config.js`
- 提交信息：`feat/fix/docs/chore/refactor(范围): 描述`
