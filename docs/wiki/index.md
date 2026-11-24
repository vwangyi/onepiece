# OnePiece Wiki

> 本 Wiki 覆盖 onepiece monorepo 的架构、应用、共享包与开发规范。
> 与 `docs/` 根目录下的技术学习笔记（VitePress）互不重叠：Wiki 只写"这个项目怎么用、怎么改"。

| 分区               | 内容                               | 入口                                                           |
| ------------------ | ---------------------------------- | -------------------------------------------------------------- |
| 00-getting-started | 环境搭建、目录结构、常用命令       | [environment-setup](./00-getting-started/environment-setup.md) |
| 01-architecture    | 总体架构、微前端、后端             | [overview](./01-architecture/overview.md)                      |
| 02-apps            | 每个应用一份说明（职责/启动/部署） | [app-main-qiankun2](./02-apps/app-main-qiankun2.md)            |
| 03-packages        | 共享包清单与新增包流程             | [overview](./03-packages/overview.md)                          |
| 04-development     | 编码规范、Git 工作流、测试         | [coding-standards](./04-development/coding-standards.md)       |
| 05-operations      | 构建、部署、故障排查               | [build-deploy](./05-operations/build-deploy.md)                |
| 06-appendix        | FAQ、术语表                        | [faq](./06-appendix/faq.md)                                    |

## 文档维护约定

- 新增文档放对应分区，命名使用 `小写中划线.md`
- 每篇文档头部维护「负责人 / 最后更新」
- 属于"某一次排查记录"的内容写入 `05-operations/troubleshooting.md`，不单独开文件
