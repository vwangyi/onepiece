# 新增共享包流程

> 负责人: TODO | 最后更新: 2026-11-24

## 1. 步骤

1. 在 `packages/` 下新建目录，命名 `onepiece-<name>`
2. `package.json`：
   - `name`: `onepiece-<name>`
   - 引用方使用 `"onepiece-<name>": "workspace:*"`
   - 私有包加 `"private": true`（不发布 npm）
3. 在 `pnpm-workspace.yaml` 覆盖范围内（默认 `packages/*` 已覆盖）
4. 补充构建产物配置（tsup / rollup / tsc，参考已有包）
5. 在根 `package.json` 注册常用命令（如需要）
6. 更新 [overview.md](./overview.md) 包清单与依赖图

## 2. 发布

- 当前只发布 `onepiece-utils`：`pnpm publish:utils`
- 新包如需发布：版本策略（changeset / 手动）：TODO

## 3. 检查清单

- [ ] 无循环依赖
- [ ] 对外导出有类型声明
- [ ] 有最小 README 与用法示例
