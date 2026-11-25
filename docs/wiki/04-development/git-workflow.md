# Git 工作流

> 负责人: TODO | 最后更新: 2026-11-24

## 1. 分支模型

| 分支 | 用途                            |
| ---- | ------------------------------- |
| dev  | 主开发分支（当前默认）          |
| TODO | feature / release / hotfix 策略 |

## 2. 提交规范（commitlint + cz-git）

- 使用 `pnpm commit` 交互式提交
- 类型：feat / fix / docs / style / refactor / perf / test / build / ci / chore
- scope：应用或包名，如 `feat(app-micro-datav): xxx`

## 3. 钩子

- pre-commit：lint-staged（prettier / eslint）
- commit-msg：commitlint

## 4. 常见操作

```bash
pnpm commit                     # 规范化提交
git log --oneline -5            # 查看最近提交
```

## 5. 注意事项

- 禁止 force push 主分支
- 提交前保证 `pnpm typecheck` 通过
