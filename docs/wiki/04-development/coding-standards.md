# 编码规范

> 负责人: TODO | 最后更新: 2026-11-24

## 1. 工具链

| 工具                     | 配置文件                        | 作用                                          |
| ------------------------ | ------------------------------- | --------------------------------------------- |
| ESLint 10（flat config） | `eslint.config.js`              | 含本地 FSD 插件 scripts/eslint-plugin-fsd.mjs |
| Prettier                 | `prettier.config.js`            | 格式化（precommit 自动执行）                  |
| cspell                   | `cspell.json`                   | 拼写检查，新增专有名词需加词库                |
| steiger                  | `steiger.config.ts`             | FSD 架构约束（app-micro-vue）                 |
| TypeScript               | 根 `tsconfig.json` + 各应用继承 |                                               |

## 2. 提交前自动执行

husky + lint-staged：staged 文件会跑 prettier / eslint

## 3. 命名与结构约定

- 目录/文件：小写中划线；组件文件 PascalCase：TODO（按实际补充）
- 导出统一走切片公共 API（index.ts），禁止深路径引用（FSD 规则）

## 4. TypeScript 约定

- TODO
