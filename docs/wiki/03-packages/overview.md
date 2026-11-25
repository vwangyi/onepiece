# 共享包总览（packages/*）

> 负责人: TODO | 最后更新: 2026-11-24

## 1. 包清单

| 包名                                          | 用途       | 使用方 | 构建 | 发布   |
| --------------------------------------------- | ---------- | ------ | ---- | ------ |
| onepiece-utils                                | 通用工具   | TODO   | TODO | 已发布 |
| onepiece-api                                  | 接口层     | TODO   | TODO | TODO   |
| onepiece-config                               | 通用配置   | TODO   | TODO | TODO   |
| onepiece-design / design-vue / design-react   | 设计系统   | TODO   | TODO | TODO   |
| onepiece-entities / features / shared / types | TODO       | TODO   | TODO | TODO   |
| onepiece-lib                                  | TODO       | TODO   | TODO | TODO   |
| onepiece-cli                                  | 脚手架/CLI | TODO   | TODO | TODO   |

## 2. 依赖关系图

```
TODO: 画包依赖图（注意禁止循环依赖）
```

## 3. 约定

- 应用引用共享包统一用 `workspace:*` 协议
- 包之间同样只能单向依赖，循环依赖视为缺陷
