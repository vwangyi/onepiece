前端架构是**对代码组织方式、技术选型、构建流程、协作规范的整体设计**，目的是让项目可维护、可扩展、可协作。它通常包含几个层面：

**1. 代码分层与目录结构**

**2. 状态管理架构**
数据流怎么设计：全局状态 vs 局部状态、单向数据流、状态该放在哪一层。Redux、Pinia、Zustand 的选型和分层规则都属于这一类。

**3. 模块化与依赖治理**
组件库、工具库、业务模块如何拆分，模块间如何解耦（比如通过接口/事件而非直接引用），是否用 monorepo 管理多包。

**4. 路由与页面架构**
路由分层、权限路由、微前端（qiankun、Module Federation）等，决定大型应用如何拆分和集成。

**5. 构建与工程化架构**
打包工具（Vite/Webpack）、CI/CD、代码规范（ESLint/Prettier）、测试体系、环境配置管理。

**6. 跨切面关注点**
请求层封装、错误处理、埋点、国际化、主题、权限——这些横跨所有模块的能力如何统一设计。

看完 `scripts/` 下 6 个文件后，我可以给你一个准确的答案。这些文件不是普通脚本，它们分别属于 4 个不同领域。

## 一、先看清这 6 个文件在做什么

| 文件                                    | 职责                                                                                     | 所属领域            |
| --------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------- |
| `scripts/base.js`                       | 读取子包 `package.json`，为每个包生成 Rollup 配置（input、output、plugins、watch）       | Rollup 打包         |
| `scripts/build.js`                      | 调用 `rollup()` 一次性构建，并追加 terser 压缩                                           | Rollup 打包         |
| `scripts/dev.js`                        | 用 `watch()` 监听源码，按事件码打印日志                                                  | Rollup 打包         |
| `scripts/dev-all.mjs`                   | 编排 nest → pkg → vue 三个进程，等待它们就绪，汇总转发日志，并在 Ctrl+C 时结束整棵进程树 | Node 进程管理       |
| `scripts/eslint-plugin-fsd.mjs`         | 手写 ESLint 插件，实现 3 条 FSD 架构约束规则                                             | ESLint 插件 / AST   |
| `scripts/prettier-plugin-md-script.mjs` | 手写 Prettier 插件，让 Markdown 里的 `<script setup>` 也能被格式化                       | Prettier 插件 / AST |

## 二、需要掌握的知识，分 5 块

### A. Node.js + ESM 基础（所有文件的基础，必须先掌握）

- **ESM 模块系统**：`package.json` 里 `"type": "module"` 让 `.js` 默认是 ESM；`import`/`export` 与 CJS `require` 的区别；`.mjs` 强制 ESM 的意义
- **路径与文件**：`import.meta.url` + `URL.fileURLToPath` 反推 `__dirname`，`import.meta.dirname`（Node 20.11+，项目锁定 22.23.2 所以可用）
- **`node:path`**：`resolve` / `dirname` / 拼接规则
- **`node:fs`**：`existsSync`、`rmSync({recursive, force})`、`fs.promises.readFile` 同步与异步 API 的选择
- **`async/await` 与 `Promise.all`**：`base.js` 里 `roots.map(getRollupConfig)` 并发读 6 个包

```js
// 36:41:scripts/base.js
async function getRollupConfig(root) {
  const config = await packageJson(root);
```

### B. 进程、信号与跨平台（`dev-all.mjs` 专有）

- **`node:child_process`**：`spawn` 的 `stdio: ['ignore','pipe','pipe']`、`cwd`、`env` 注入
- **进程组**：`detached: true` + `process.kill(-pid)` 才能杀掉整棵进程树（包含 pnpm 启动的孙进程）；Windows 只能单杀
- **流式日志**：`setEncoding('utf8')` + 按 `\r?\n` 切行 + 维护残留 `buffer`（chunk 不保证按行对齐，这是新手最容易踩的坑）
- **信号处理**：`SIGINT` / `SIGTERM` / `SIGHUP` 与 `process.on('exit')` 的兜底差异
- **就绪探测**：日志正则匹配 vs `node:net` 端口探活 vs 超时降级，三种并行
- **异步状态机**：`waitReady` 里用 `settled` 标志做幂等，避免 `timeout` 和 `port connect` 同时 resolve

### C. Rollup 打包体系（三个打包脚本的核心）

- **基本模型**：entry → output；`format` 为 `esm` / `cjs` / `iife` 的区别与用途
- **`external` + `globals`**：为什么 vue/axios 不打包（由宿主提供），iife 下需映射成全局变量名
- **iife 的 `name`**：必须合法 JS 标识符，所以要把 `onepiece-utils` 这种 kebab-case 转驼峰 —— 这里的正则 `replace(/[^a-zA-Z0-9_$]+(.)?/g, ...)` 必读
- **插件机制**：插件是一个带 `transform`/`resolveId`/`load` 钩子的对象，链式顺序会影响结果
- **本项目用到的 7 个插件各自解决什么**：
  - `@rollup/plugin-node-resolve` 裸包名解析
  - `@rollup/plugin-commonjs` CJS 依赖转 ESM
  - `@rollup/plugin-json` JSON 转 ESM
  - `@rollup/plugin-typescript` 编译 TS + 产出 `.d.ts`
  - `@vitejs/plugin-vue` 编译 SFC
  - `rollup-plugin-postcss` 处理样式
  - `@rollup/plugin-terser` 仅 build 时压缩
- **TypeScript 构建陷阱**：根 `tsconfig` 为类型检查设了 `noEmit: true`，子包继承后插件不产出代码 → 必须显式覆盖 `noEmit: false`，这是 `base.js` 注释里专门解释的那段
- **`bundle.write()` vs `generate()`**、`watch()` 的事件码 `START` / `BUNDLE_START` / `BUNDLE_END` / `ERROR`
- **sourcemap** 的作用与 `declarationDir` 的意义

### D. 工具插件开发（两个 `.mjs`，最难的一块）

**ESLint 插件**（`eslint-plugin-fsd.mjs`）：

- ESLint 10 flat config 的插件对象结构：`{ rules: {...} }`
- 单条规则的 `meta`（`type` / `docs` / `messages` / `schema`）+ `create(context)` 返回 visitor 对象
- **AST 遍历**：`ImportDeclaration` 节点、`node.source.value` 取路径、`context.report({ node, messageId, data })`
- `context.filename` 拿当前文件路径、`context.getFilename()` 的兼容写法
- 需要先懂 **FSD 架构规范**本身：层级顺序、切片、`index.ts` 公共 API、`@x` 交叉导入
- 调试手段：`RuleTester` 写用例，比在编辑器里试快得多

**Prettier 插件**（`prettier-plugin-md-script.mjs`）：

- Prettier 插件三件套：`languages`（声明 parser 与扩展名映射）、`parsers`、`printers`
- **`embed` 钩子**：告诉 Prettier 某段节点内部该用哪个 parser 再格式化 —— 这是整个文件的核心思路
- **Doc IR**：`builders.hardline` 这类排版指令，而不是直接拼 `'\n'` 字符串
- `textToDoc` 递归调用 Prettier 自身
- 导入 `prettier/doc`、`prettier/plugins/markdown` 属于内部路径，升级 Prettier 大版本时容易失效，需知道这是不稳定 API
- 读懂 mdast：`node.type === 'html'`、`node.position.start.column` 用来判断是否顶格

### E. 通用内功（跨所有文件，投入产出比最高）

- **正则**：这 6 个文件里出现了 10+ 处。重点掌握 `[\s\S]*?` 惰性匹配、命名/位置捕获 `exec()[1]`、`replace` 回调函数、转义类 `\x1b`
- **函数式小工具**：`color(code, text)` / `log(tag, msg, code)` 这类柯里化封装，是让脚本可读的关键
- **错误兜底**：`prettier` 插件里 `try/catch` 返回 `undefined` 保证单个语法错误不炸掉整个格式化；`dev-all.mjs` 里 `killTree` 的双重 catch
- **可观测性**：ANSI 颜色、时间戳、统一 `[tag]` 前缀 —— 多进程日志不这样处理就没法看

## 三、建议的学习顺序

1. **第 1 阶段（1 周）**：ESM + `node:fs` / `node:path` / `node:url`，动手改写 `build.js`，比如加个 `--packages=xxx` 参数
2. **第 2 阶段（1～2 周）**：Rollup 官方文档的 "Configuration Options" 和插件开发章节，独立复现 `base.js` 的多格式输出
3. **第 3 阶段（1 周）**：`node:child_process` + 信号，尝试把 `dev-all.mjs` 改成配置驱动的任务编排（比如支持并行启动）
4. **第 4 阶段（2～3 周）**：AST 与插件生态。先写一条最简单的 ESLint 规则（如禁止 `console.log`），再读 `eslint-plugin-fsd.mjs` 就会非常轻松；Prettier 插件建议放到最后，因为它依赖内部 API，可迁移性低

## 四、一句话判断标准

> 能独立写出 `base.js` = 懂 Rollup + ESM 路径处理；
> 能写出 `dev-all.mjs` = 懂操作系统进程模型；
> 能写出 `eslint-plugin-fsd.mjs` = 懂 AST 与静态分析。

前两块是**通用工程能力**，第三块是**垂直领域能力**，按需学即可 —— 日常 90% 的脚本需求只需要 A + E 两块。
