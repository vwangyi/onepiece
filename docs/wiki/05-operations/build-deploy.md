# 构建与部署

> 负责人: TODO | 最后更新: 2026-11-24

## 1. 构建矩阵

| 应用              | 命令                                    | 产物  | 部署方式         |
| ----------------- | --------------------------------------- | ----- | ---------------- |
| app-main-qiankun2 | `pnpm --filter app-main-qiankun2 build` | dist/ | TODO             |
| app-micro-datav   | `pnpm --filter app-micro-datav build`   | dist/ | TODO             |
| app-nest          | TODO                                    | TODO  | TODO             |
| packages          | TODO                                    | TODO  | TODO（npm 发布） |

## 2. 环境矩阵

| 环境 | 地址 | 说明 |
| ---- | ---- | ---- |
| dev  | TODO |      |
| test | TODO |      |
| prod | TODO |      |

## 3. 部署流程

- TODO（CI/CD、镜像、回滚方案）

## 4. 微前端上线注意

- 子应用资源 `output.publicPath` 必须指向子应用自己的绝对地址，否则主应用 origin 下 404
- 各子应用 entry / activeRule 与 `05-operations/troubleshooting.md` 中的端口表保持一致
