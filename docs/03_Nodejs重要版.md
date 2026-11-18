## package.json

我们按实战 + 面试的优先级梳理 package.json 的核心概念，区分清楚：它是当前包的清单文件，给 npm / pnpm / yarn、构建工具、编辑器读的一份元数据。

基础身份字段

• name：包名。发布到 npm 必须全局唯一；本地私包、monorepo 子包也要规范命名，通常 @scope/xxx。只能小写、短横线，不能有特殊符号。

• version：版本号，遵循 semver（语义化版本）主.次.补丁

◦ major：不兼容破坏性变更

◦ minor：新增功能，向下兼容

◦ patch：bug 修复
还有预发布标签 1.0.0-beta.1。

• private：true 代表禁止发布到 npm，业务项目一般都打开，防止误发布。monorepo 根目录常设为 private。

• description、author、license、repository、keywords：多用于包文档、npm 展示，业务项目可以简单写。

入口相关（非常容易踩坑）

• main：CommonJS 入口，老工具读取的主文件

• module：ESM 入口，打包工具优先读取，面向现代环境

• exports（现在推荐）：导出条件，优先级高于 main / module。可以区分 import、require、node、browser，还能做子路径导出，monorepo、组件库必备。

• types / typings：TS 类型声明入口，指向 .d.ts，给 IDE 和 tsc 找类型。

• browser：给浏览器环境的替换规则，替换 node 内置模块。

scripts 脚本

scripts 是命令别名。
"scripts": {
"dev": "vite",
"build": "tsc && vite build"
}
运行 npm run dev 会执行对应命令。
特点：脚本里优先使用本项目 node_modules/.bin 下的命令，不用写完整路径。
Turb、nx 这类任务编排工具，很多也是读取或者扩展 scripts。

依赖管理

• dependencies：业务运行依赖，上线代码要用到（组件库、axios），安装 npm i xxx 默认进这里

• devDependencies：开发依赖，只本地构建、测试用（vite、eslint、typescript），上线产物不依赖

• peerDependencies：同伴依赖。比如组件库依赖 Vue，要求宿主环境提前装好指定版本 Vue，自己不打包、不安装。配套 peerDependenciesMeta 可以设置可选 peer 依赖。

• optionalDependencies：可选依赖，安装失败不会中断整个安装流程，代码里要做好判断。

版本锁定与安装行为

• engines：声明支持的 node、包管理器版本，只是提示，默认不强制拦截（部分工具可以校验）

• packageManager：指定项目应该用 pnpm / yarn / npm，配合 corepack

• workspaces：monorepo 配置，声明哪些目录是子包（pnpm、yarn 支持）

构建、发布、辅助字段

• files：发布包时，包含哪些文件。只打包清单里写的，避免把源码、测试、配置文件发到 npm。

• sideEffects：标记哪些文件有副作用，给打包工具做 Tree-Shaking。"sideEffects": false 代表全部模块无副作用。

• bin：声明命令行工具，安装后自动注册全局命令。

• config：给脚本传默认环境配置。

补充几个高频误区

1. package.json 只是元描述，不控制实际运行；exports 只是约定，打包工具、Node 才去解析。

2. semver 范围符：^、~、*，搭配 lock 文件（package-lock.json / pnpm-lock.yaml）锁定实际安装版本。

3. 不是所有字段 npm 都管，很多是 vite、rollup、tsc、eslint 等工具自己扩展读取的。

主线总结

package.json 就是回答几个问题：
我是谁（name + version）、我对外提供什么入口、我依赖谁、我有哪些开发命令、我该怎么发布。

如果你继续，我们可以讲 semver 版本范围规则，或者 pnpm workspaces 搭配 package.json 在 monorepo 里怎么协作。

## 内置包

Node.js 内置模块（核心包），本质就是 Node 原生自带、不需要 npm install，直接 require / import 就能引入的能力。我们按面试高频 + 工程实战优先级梳理核心概念。

1. fs 文件系统模块

负责读写本地文件、目录。

• 两套 API：回调版、Promise 版（fs/promises，推荐），还有同步 fs.readFileSync

• 核心概念：文件描述符、流、权限、路径、软链接硬链接

• 坑点：路径相对位置是相对于进程执行目录，不是当前 js 文件；大文件不能一次性 readFile，要用流。

2. path 路径模块

专门处理跨平台路径问题（Windows \、macOS/Linux /）。

• path.join：拼接路径，自动处理分隔符

• path.resolve：从右往左拼接，返回绝对路径

• path.dirname / basename / extname：取目录、文件名、后缀

• 区分：__dirname（当前文件目录）、process.cwd()（命令执行目录），超级高频考点。

3. http / https 模块

Node 最标志性模块，可以写 Web 服务，也可以发请求。

• http.createServer：创建服务，拿到 req（请求）、res（响应）

• 本质：基于 TCP，解析 http 报文，处理请求行、header、body

• 注意：原生 http 不自带路由、参数解析，这也是 Express、Nest 存在的理由

• https 需要传入证书、密钥。

4. stream 流（非常重要）

不是独立包，但 fs、http 底层大量使用 Stream，属于 Node 核心思想。
四类流：

• Readable：可读流（读文件、收到 http 请求体）

• Writable：可写流（写文件、返回 http 响应）

• Duplex：双向流，可读可写（TCP socket）

• Transform：转换流，一边读一边修改内容（zlib 压缩）
核心：分批处理数据，不用把全部内容加载进内存，适合大文件。背一下 pipe、事件 data / end / error。

5. buffer 缓冲区

JS 早期没有二进制类型，Buffer 用来代表原始二进制数据。

• 是 Uint8Array 的子类

• 网络传输、文件读写底层都是 Buffer

• 概念：编码转换（utf8、base64、hex）

6. events 事件模块

Node 异步的根基，很多内置对象继承 EventEmitter。

• on 注册监听、emit 触发事件、once 只执行一次

• 特点：同步执行回调；error 事件不监听会直接崩溃进程；支持异步事件。
发布订阅模式就是基于它。

7. os 操作系统信息

获取 CPU 数量、内存、平台、主机名。
常见用途：集群 cluster、根据 CPU 数开启多进程。

8. cluster 集群模块

Node 单线程，CPU 多核跑不满，cluster 可以 fork 多个子进程，监听同一个端口，分担流量。

• master 主进程 + worker 工作进程

• 注意：进程之间内存隔离，不能直接共享变量，需要进程通信 IPC

9. child_process 子进程

开启外部进程，执行别的命令或者脚本。

• exec：缓存输出，适合短命令

• spawn：流形式输出，适合长时间、大量输出

• fork：专门用来新建 Node 子进程，自带 IPC 通信通道

10. util 工具模块

• util.promisify：把回调风格函数转成 Promise（老代码改造很常用）

• 还有类型判断、格式化等辅助方法。

11. url / querystring

处理链接和参数。
老 url.parse 已经废弃，现在推荐 new URL()；URLSearchParams 处理查询参数。

12. zlib 压缩模块

流形式做 gzip、deflate 压缩，服务端返回压缩资源会用到。

13. process（不是包，是全局对象，但必讲）

进程信息：

• process.env 环境变量

• process.argv 命令行入参

• process.on('uncaughtException', ...) 全局异常捕获

• process.nextTick：微任务队列，比 Promise 微任务更早执行

14. crypto 加密模块

Node 原生加密，MD5、sha256、AES、RSA。业务做签名、校验、密码摘要很常用，尽量不要自己手写加密。

一条主线串联

events 是异步思想基础；buffer + stream 负责二进制数据流；fs + path 操作本地文件；http 构建 Web 服务；child_process / cluster 解决单进程、多核问题；crypto 提供安全能力。

补充面试区分点：
内置模块，是 C++ 底层 + JS 封装，跑在 Node 运行时里，浏览器是没有这些的。这也是 Node 可以做后端、脚本、工具，而浏览器 JS 不行的根本原因之一。

接下来可以继续讲 Node 事件循环，或者讲 cluster、进程、线程之间的区别。
