# 应用文档索引

> 每个应用一份文档，统一使用下面的模板结构。

## 应用清单

| 应用              | 类型                      | 文档                                           | 启动命令                              | 端口 |
| ----------------- | ------------------------- | ---------------------------------------------- | ------------------------------------- | ---- |
| app-main-qiankun2 | qiankun 主应用（webpack） | [app-main-qiankun2.md](./app-main-qiankun2.md) | `pnpm --filter app-main-qiankun2 dev` | 4000 |
| app-micro-datav   | qiankun 子应用（webpack） | [app-micro-datav.md](./app-micro-datav.md)     | `pnpm --filter app-micro-datav dev`   | 5020 |
| app-micro-react   | React 子应用              | [app-micro-react.md](./app-micro-react.md)     | TODO                                  | TODO |
| app-micro-vue     | Vue 主业务（FSD）         | [app-micro-vue.md](./app-micro-vue.md)         | TODO                                  | TODO |
| app-nest          | NestJS 后端               | [app-nest.md](./app-nest.md)                   | TODO                                  | TODO |
| app-nuxt          | Nuxt 应用                 | [app-nuxt.md](./app-nuxt.md)                   | TODO                                  | TODO |

## 应用文档统一模板

```markdown
# <应用名>

> 负责人: | 最后更新:

## 1. 职责与边界（它做什么 / 不做什么）

## 2. 技术栈与构建工具

## 3. 启动 / 构建 / 部署命令

## 4. 目录结构说明

## 5. 路由与页面清单

## 6. 与其他应用的依赖关系（接口、共享包、微前端配置）

## 7. 环境变量与配置

## 8. 已知问题 / TODO
```
