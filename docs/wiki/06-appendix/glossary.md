# 术语表

| 术语                        | 说明                                                                |
| --------------------------- | ------------------------------------------------------------------- |
| FSD (Feature-Sliced Design) | 前端分层架构方法论，app-micro-vue 采用，steiger 校验                |
| qiankun                     | 蚂蚁微前端框架，基于 single-spa；通过 import-html-entry 加载子应用  |
| UMD                         | 通用模块定义，qiankun 要求子应用以 UMD 导出 bootstrap/mount/unmount |
| activeRule                  | qiankun 微应用的激活规则，按 `location.pathname.startsWith` 匹配    |
| publicPath                  | webpack 资源加载前缀；子应用在 qiankun 下需运行时修正避免 404       |
| workspace:*                 | pnpm workspace 内部包引用协议                                       |
| ADR                         | Architecture Decision Record，见 01-architecture/overview.md        |
| import-html-entry           | qiankun 拉取并执行子应用 HTML 入口脚本的库                          |
