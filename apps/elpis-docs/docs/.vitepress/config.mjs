import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "zh-CN",
  title: "WANGYI",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  vite: {
    server: {
      port: 5111
    }
  },
  description: "A VitePress Site",
  themeConfig: {
    nav: [
      {
        text: "数据库",
        link: "/views/01_数据库/01_mysql/04_查.md",
        activeMatch: "^/01_数据库/"
      },
      {
        text: "高级语言",
        activeMatch: "^/02_高级语言/",
        items: [
          {
            text: 'JavaScript',
            link: "/views/02_高级语言/02_JavaScript/00_JavaScript.md",
            activeMatch: "^/views/02_高级语言/02_JavaScript/",
          },
          {
            text: 'TypeScript',
            link: '/02_高级语言/03_TypeScript/index.md',
            activeMatch: "^/02_高级语言/03_TypeScript/",
          },
          {
            text: 'Nodejs',
            link: '/02_高级语言/00_Nodejs/01_globalThis全局对象.md',
            activeMatch: "^/02_高级语言/00_Nodejs/",
          },
          {
            text: '标记语言',
            items: [
              {
                text: 'HTML',
                link: "/views/02_高级语言/04_标记语言/HTML/00_HTML.md",
                // activeMatch: "^/02_高级语言/04_标记语言/HTML/"
              },
              {
                text: 'Markdown',
                link: "/views/02_高级语言/04_标记语言/MD/MD语法.md",
                // activeMatch: "^/02_高级语言/04_标记语言/Markdown/" 
              },
            ]
          }
        ],
      },
      {
        text: "工程搭建",
        activeMatch: "^/03_工程搭建/",
        items: [
          {
            text: '包管理',
            items: [
              {
                text: '模块module',
                link: "/views/03_工程搭建/03_包管理/00_模块/00_ESM.md",
                activeMatch: "^/03_工程搭建/03_包管理/00_模块",
              },
              {
                text: '包package',
                link: "/views/03_工程搭建/03_包管理/01_包/00_package.md",
                activeMatch: "^/03_工程搭建/03_包管理/01_包",
              },
              {
                text: '包管理器',
                link: "/views/03_工程搭建/03_包管理/02_npm-yarn-pnpm.md",
                activeMatch: "^/03_工程搭建/03_包管理/02_npm-yarn-pnpm",
              },
              {
                text: '多包管理方案',
                link: "/views/03_工程搭建/03_包管理/04_多包管理方案/02_monorepo.md",
                activeMatch: "^/03_工程搭建/03_包管理/03_monorepo",
              },
            ]
          },
          {
            text: '构建器',
            items: [
              {
                text: 'webpack',
                link: "/views/03_工程搭建/04_构建器/01_Webpack/00_webpack.md",
                activeMatch: "^/03_工程搭建/04_构建器/01_Webpack/",
              },
              {
                text: 'rollup',
                link: '/views/03_工程搭建/04_构建器/03_Rollup/00_Rollup.md',
              },
              {
                text: 'esbuild',
                link: 'esbuild',
              },
              {
                text: 'vite',
                link: 'vite',
              },
              {
                text: '自定义构建器',
                link: '自定义构建器',
              },

            ]
          },
          {
            text: '脚手架',
            items: [
              {
                text: 'vue-cli',
                link: '1',
              },
              {
                text: 'vite',
                link: '11',
              },
              {
                text: 'create-react-app',
                link: '2',
              },
              {
                text: 'umijs',
                link: '3',
              },
              {
                text: '自定义脚手架',
                link: '4',
              },

            ]
          },
          {
            text: '工具链',
            items: [
              {
                text: '自定义工具链',
                link: '/03_工程搭建/04_工具链/00_自定义工具链.md',
                activeMatch: '^/03_工程搭建/04_工具链/',
              },
              {
                text: 'babel',
                link: '/views/03_工程搭建/04_工具链/01_babel/01_babel.md',
                activeMatch: '^/views/03_工程搭建/04_工具链/01_babel/',
              },
              {
                text: '代码规范',
                link: '/03_工程搭建/04_工具链/02_代码规范.md',
                activeMatch: '^/03_工程搭建/04_工具链/',
              },
              {
                text: '前端测试框架',
                link: '/03_工程搭建/04_工具链/03_前端测试框架.md',
                activeMatch: '^/03_工程搭建/04_工具链/',
              },
              {
                text: 'css预编译器',
                link: '/03_工程搭建/04_工具链/04_css预编译器.md',
                activeMatch: '^/03_工程搭建/04_工具链/',
              },
            ]
          },
        ],
      },
      {
        text: '高级框架',
        items: [
          {
            text: 'web',
            items: [
              { text: 'Vue', link: "/views/05_高级框架/00_Vue/00_Vue.md", activeMatch: "^/05_高级框架/00_Vue/" }
            ]
          },
          {
            text: 'desktop',
            items: [
              { text: 'Electron', link: "/views/05_高级框架/04_Electron/electron.md", activeMatch: "^/05_高级框架/04_Electron/" }
            ]
          },
          {
            text: 'BFF',
            items: [
              { text: 'Koajs', link: "/views/05_高级框架/01_Koa/index.md", },
              { text: 'Eggjs', link: "/views/05_高级框架/01_Koa/index.md", },
              { text: 'Nestjs', link: '/05_高级框架/02_Nest/index.md' }
            ]
          },
        ]
      },
      // {
      //   text: "前端框架",
      //   link: "/views/05_高级框架/00_Vue/00_Vue.md",
      //   activeMatch: "^/05_高级框架/"
      // },
      {
        text: "业务场景",
        link: "/views/06_业务/01_可视化/01_canvas.md",
        activeMatch: "^/views/06_业务/"
      },
      {
        text: "数据结构和算法",
        link: "/views/09_常见算法/01_数据结构与算法/index.md",
        activeMatch: "^/views/09_常见算法/"
      },
      {
        text: "运维部署",
        link: "/views/08_运维/环境/mac.md",
        activeMatch: "^/views/08_运维/"
      },
      {
        text: "人工智能",
        link: "/views/07_AI/01_大语言模型.md",
        activeMatch: "^/views/07_AI/"
      }
    ],
    sidebar: {
      "/views/03_工程搭建/04_工具链/01_babel/": [
          {
            text: 'babel',
            link: '/views/03_工程搭建/04_工具链/01_babel/01_babel.md', 
          }, 
          {
            text: 'babel配置文件',
            link: '/views/03_工程搭建/04_工具链/01_babel/01_babel配置文件.md', 
          }
      ],
      "/views/02_高级语言/04_标记语言/HTML/": [
        {
          text: 'HTML',
          link: "/views/02_高级语言/04_标记语言/HTML/00_HTML.md",
        },
        {
          text: '盒模型',
          link: "/views/02_高级语言/04_标记语言/HTML/css-盒子-盒模型.md",
        },
        {
          text: '块盒变换',
          link: "/views/02_高级语言/04_标记语言/HTML/css-盒子-块盒变换.md",
        },
        {
          text: '盒子显示隐藏',
          link: "/views/02_高级语言/04_标记语言/HTML/css-盒子-显示隐藏.md",
        },
        {
          text: '标准流布局',
          link: "/views/02_高级语言/04_标记语言/HTML/css-布局-标准流布局.md",
        },
        {
          text: '定位布局',
          link: "/views/02_高级语言/04_标记语言/HTML/css-布局-定位布局.md",
        },
        {
          text: '浮动布局',
          link: "/views/02_高级语言/04_标记语言/HTML/css-布局-浮动布局.md",
        },
        {
          text: 'flex布局',
          link: "/views/02_高级语言/04_标记语言/HTML/css-布局-flex布局.md",
        },
        {
          text: 'grid布局',
          link: "/views/02_高级语言/04_标记语言/HTML/css-布局-grid布局.md",
        },
        {
          text: '过渡动画',
          link: "/views/02_高级语言/04_标记语言/HTML/css-盒子-过渡动画.md",
        },
        {
          text: '帧动画',
          link: "/views/02_高级语言/04_标记语言/HTML/css-盒子-帧动画.md",
        },


      ],
      "/views/02_高级语言/02_JavaScript/": [
        {
          text: '核心概念',
          link: "/views/02_高级语言/02_JavaScript/00_JavaScript.md"
        },
        {
          text: '\<a href="https://cn.vuejs.org/" \/\>变量\<a\>',
          items: [
            {
              text: '变量声明',
              link: "/views/02_高级语言/02_JavaScript/01_变量声明.md"
            },
            {
              text: '数据类型',
              link: "/views/02_高级语言/02_JavaScript/02_数据类型.md"
            },
          ]
        },
        {
          text: '\<a href="https://cn.vuejs.org/" \/\>函数\<a\>',
          items: [
            {
              text: '函数声明',
              link: "/views/02_高级语言/02_JavaScript/01_函数声明.md"
            },
          ]
        }
      ],
      "/views/02_高级语言/03_TypeScript/": [
        {
          text: '\<a href="https://cn.vuejs.org/" \/\>TypeScript\<a\>',
          items: [
            {
              text: '简介',
              link: "/views/02_高级语言/03_TypeScript/index.md"
            },
          ]
        },
      ],
      "/views/03_工程搭建/03_包管理/01_包": [
        {
          text: '包',
          items: [

            {
              text: 'package',
              link: "/views/03_工程搭建/03_包管理/01_包/00_package.md"
            },
            {
              text: '包版本',
              link: "/views/03_工程搭建/03_包管理/01_包/01_包版本.md"
            },
            {
              text: '包依赖',
              link: "/views/03_工程搭建/03_包管理/01_包/96_包依赖.md"
            },
            {
              text: '包入口',
              link: "/views/03_工程搭建/03_包管理/01_包/96_包入口.md"
            },
            {
              text: '包执行脚本',
              link: "/views/03_工程搭建/03_包管理/01_包/94_包执行脚本.md"
            },
            {
              text: '包环境',
              link: "/views/03_工程搭建/03_包管理/01_包/95_包环境.md"
            },




            {
              text: '指定包的模块化规范',
              link: "/views/03_工程搭建/03_包管理/01_包/93_包模块化规范.md"
            },
            {
              text: '发布npm包',
              link: "/views/03_工程搭建/03_包管理/01_包/98_发布npm包.md"
            },
            {
              text: '搭建npm私服',
              link: "/views/03_工程搭建/03_包管理/01_包/99_搭建npm私服.md"
            },
          ]
        }
      ],
      "/views/02_JavaScript/": [
        {
          text: "Nodejs",
          items: [
            {
              text: "Nodejs",
              link: "/views/02_JavaScript/01_Nodejs/index.md"
            },
            {
              text: "globalThis",
              link: "/views/02_JavaScript/01_Nodejs/01_globalThis全局对象.md"
            },
            {
              text: "path路径模块",
              link: "/views/02_JavaScript/01_Nodejs/01_path.md"
            },
            {
              text: "fs文件系统模块",
              link: "/views/02_JavaScript/01_Nodejs/02_fs文件系统模块.md"
            },
          ]
        },
        {
          text: "TypeScript",
          items: [
            {
              text: "变量声明",
              link: "/views/02_JavaScript/00_TypeScript/index.md"
            }
          ]
        },
        {
          text: "变量",
          items: [
            {
              text: "变量声明",
              link: "/views/02_JavaScript/01_变量/01_变量声明.md"
            },
            {
              text: "数据类型",
              link: "/views/02_JavaScript/01_变量/02_数据类型.md"
            }
          ]
        },
        {
          text: "函数",
          items: [
            {
              text: "函数声明",
              link: "/views/02_JavaScript/02_函数/01_函数声明.md"
            }
          ]
        },
        {
          text: "面向对象",
          items: [
            {
              text: "原型链",
              link: "/views/02_JavaScript/03_面向对象/00_原型链.md"
            },
            {
              text: "类",
              link: "/views/02_JavaScript/03_面向对象/01_类.md"
            },
            {
              text: "封装继承多态",
              link: "/views/02_JavaScript/03_面向对象/03_封装继承多态.md"
            },
            {
              text: "数组",
              link: "/views/02_JavaScript/03_面向对象/02_数组.md"
            },
            {
              text: "字符串",
              link: "/views/02_JavaScript/03_面向对象/04_字符串.md"
            }
          ]
        },
        {
          text: "异步编程",
          items: [
            {
              text: "回调函数",
              link: "/views/02_JavaScript/04_异步编程/01_回调函数.md"
            },
            {
              text: "Promise",
              link: "/views/02_JavaScript/04_异步编程/02_Promise.md"
            },
            {
              text: "async/await",
              link: "/views/02_JavaScript/04_异步编程/03_async-await.md"
            }
          ]
        },
        {
          text: "其他",
          items: [
            {
              text: 'DOM',
              link: '/02_JavaScript/07_其他/01_DOM.md',
            },
            {
              text: 'js',
              link: '/02_JavaScript/07_其他/xxx.md',
            }
          ]
        },
        {
          text: "HTML/CSS",
          items: [
            {
              text: "视频标签video",
              link: "/views/02_JavaScript/05_HTML&CSS/00_video.md"
            },
            {
              text: "图片标签img",
              link: "/views/02_JavaScript/05_HTML&CSS/01_img.md"
            },
            {
              text: "HTML",
              link: "/views/02_JavaScript/05_HTML-CSS/01_HTML.md"
            },
            {
              text: "CSS",
              link: "/views/02_JavaScript/05_HTML-CSS/02_CSS.md"
            },
            {
              text: "scss",
              link: "/views/02_JavaScript/05_HTML-CSS/03_scss.md"
            },
            {
              text: "tailwidd",
              link: "/views/02_JavaScript/05_HTML-CSS/04_scss.md"
            }
          ]
        }
      ],
      "/views/01_数据库/": [
        {
          text: 'mysql',
          items: [
            {
              text: '增（给表增加一条记录）',
              link: '/01_数据库/01_mysql/01_增.md'
            },
            {
              text: '删（给表删除一条记录）',
              link: '/01_数据库/01_mysql/02_删.md'
            },
            {
              text: '改（给某条记录修改）',
              link: '/01_数据库/01_mysql/03_改.md'
            },
            {
              text: '查（查询某条记录）',
              link: '/01_数据库/01_mysql/04_查.md'
            },
            {
              text: '创建表',
              link: '/01_数据库/01_mysql/06_建表.md'
            },
          ]
        },
        {
          text: 'redis',
          link: '/01_数据库/02_redis/00_index.md'
        },

      ],
      "/views/05_高级框架/01_Koa/": [
        {
          text: '\<a href="https://koajs.com/" \/\>Koajs\<a\>',
          items: [
            {
              text: "Koa",
              link: "/views/05_高级框架/01_Koa/index.md",
            },
            {
              text: "洋葱圈模型",
              link: "/views/05_高级框架/01_Koa/02_洋葱圈模型.md",
            },
            {
              text: "服务端路由KoaRouter",
              link: "/views/05_高级框架/01_Koa/03_服务端路由KoaRouter.md",
            },
            {
              text: "SpringMVC架构",
              link: "/views/05_高级框架/01_Koa/04_SpringMVC架构.md",
            },
          ]
        }
      ],
      "/views/05_高级框架/00_Vue/": [
        {
          text: '\<a href="https://cn.vuejs.org/" \/\>Vuejs\<a\>',
          items: [
            {
              text: "简介",
              link: "/views/05_高级框架/00_Vue/00_Vue.md"
            },
            {
              text: "响应式数据",
              link: "/views/05_高级框架/00_Vue/01_响应式数据.md"
            },
            {
              text: "模版语法",
              link: "/views/05_高级框架/00_Vue/02_模版语法.md"
            },
            {
              text: "依赖注入 provide/inject",
              link: "/views/05_高级框架/00_Vue/03_依赖注入.md"
            },
            {
              text: "计算属性computed",
              link: "/views/05_高级框架/00_Vue/04_计算属性computed.md"
            },
            {
              text: "监听",
              link: "/views/05_高级框架/00_Vue/05_监听.md"
            },
            {
              text: "异步组件",
              link: "/views/05_高级框架/00_Vue/06_异步组件.md"
            },
            {
              text: "07_状态管理1store",
              link: "/views/05_高级框架/00_Vue/07_状态管理1store.md"
            },
            {
              text: "07_状态管理pinia",
              link: "/views/05_高级框架/00_Vue/07_状态管理pinia.md"
            },
            {
              text: "07_状态管理vuex",
              link: "/views/05_高级框架/00_Vue/07_状态管理vuex.md"
            },
            {
              text: "前端路由VueRouter",
              link: "/views/05_高级框架/00_Vue/08_前端路由VueRouter.md"
            },
            {
              text: "09_测试",
              link: "/views/05_高级框架/00_Vue/09_测试.md"
            },
            {
              text: "11_模版引用",
              link: "/views/05_高级框架/00_Vue/11_模版引用.md"
            },
            {
              text: "12_生命周期",
              link: "/views/05_高级框架/00_Vue/12_生命周期.md"
            },
            {
              text: "性能优化",
              link: "/views/05_高级框架/00_Vue/13_性能优化.md"
            },
            {
              text: "14_组合式API",
              link: "/views/05_高级框架/00_Vue/14_组合式API.md"
            },
            {
              text: "响应式系统",
              link: "/views/05_高级框架/00_Vue/15_响应式系统.md"
            },
            {
              text: "模版渲染机制",
              link: "/views/05_高级框架/00_Vue/16_模版渲染机制.md"
            },
            {
              text: "渲染函数",
              link: "/views/05_高级框架/00_Vue/17_渲染函数.md"
            },
            {
              text: "web-components和vue-components",
              link: "/views/05_高级框架/00_Vue/18_web-components和vue-components.md"
            },
            {
              text: "组合式函数hooks",
              link: "/views/05_高级框架/00_Vue/19_组合式函数hooks.md"
            },

            {
              text: "组件",
              link: "/views/05_高级框架/00_Vue/20_组件.md"
            },
            {
              text: "自定义指令",
              link: "/views/05_高级框架/00_Vue/21_自定义指令.md"
            },
            {
              text: "插件",
              link: "/views/05_高级框架/00_Vue/22_插件.md"
            },


            {
              text: "v-bind和props",
              link: "/views/05_高级框架/00_Vue/23_v-bind和props.md"
            },
            {
              text: "v-on和emit",
              link: "/views/05_高级框架/00_Vue/24_v-on和emit.md"
            },
            {
              text: "v-for列表渲染",
              link: "/views/05_高级框架/00_Vue/25_v-for列表渲染.md"
            },
            {
              text: "25_v-model",
              link: "/views/05_高级框架/00_Vue/25_v-model.md"
            },
            {
              text: "样式穿透",
              link: "/views/05_高级框架/00_Vue/27_样式穿透.md"
            },

          ]
        },
      ],
      "/views/03_工程搭建/03_包管理/00_模块": [
        {
          text: '\<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules" \/\>ESM\<a\>',
          items: [
            {
              text: 'es module',
              link: "/views/03_工程搭建/03_包管理/00_模块/00_ESM.md"
            },
          ]
        },
        {
          text: '\<a href="https://nodejs.org/docs/latest/api/modules.html#modules-commonjs-modules" \/\>Commonjs\<a\>',
          items: [
            {
              text: 'Commonjs',
              link: "/views/03_工程搭建/03_包管理/00_模块/01_Commonjs.md"
            }
          ]
        }
      ],
      "/views/05_高级框架/05_Nestjs/": [],
      "/views/05_高级框架/04_Electron/": [
        {
          text: '\<a href="https://www.electronjs.org/zh/docs/latest/" \/\>Electronjs\<a\>',
          items: [
            {
              text: "electron",
              link: "/views/05_高级框架/04_Electron/electron.md"
            },
          ]
        }
      ],
      "/views/03_工程搭建/04_构建器/01_Webpack/": [
        {
          text: '\<a href="https://webpack.docschina.org/concepts/" \/\>Webpack\<a\>',
          items: [
            {
              text: "webpack",
              link: "/views/03_工程搭建/04_构建器/01_Webpack/00_webpack.md"
            },
            {
              text: "打包入口",
              link: "/views/03_工程搭建/04_构建器/01_Webpack/01_打包入口.md"
            },
            {
              text: "简介",
              link: "/views/03_工程搭建/04_构建器/01_Webpack/01_简介.md"
            },
            {
              text: "入口出口",
              link: "/views/03_工程搭建/04_构建器/01_Webpack/01_入口出口.md"
            },
            {
              text: "处理vue文件",
              link: "/views/03_工程搭建/04_构建器/01_Webpack/02_处理vue文件.md"
            },
            {
              text: "处理js文件",
              link: "/views/03_工程搭建/04_构建器/01_Webpack/03_处理js文件.md"
            },
            {
              text: "处理样式文件",
              link: "/views/03_工程搭建/04_构建器/01_Webpack/04_处理样式文件.md"
            },
            {
              text: "处理图片资源",
              link: "/views/03_工程搭建/04_构建器/01_Webpack/05_处理图片资源.md"
            },
            {
              text: "处理html资源",
              link: "/views/03_工程搭建/04_构建器/01_Webpack/06_处理html资源.md"
            },
            {
              text: "devServer",
              link: "/views/03_工程搭建/04_构建器/01_Webpack/07_devServer.md"
            },

            {
              text: "SourceMap",
              link: "/views/03_工程搭建/04_构建器/01_Webpack/10_SourceMap.md"
            },
            {
              text: "TreeShaking",
              link: "/views/03_工程搭建/04_构建器/01_Webpack/04_TreeShaking.md"
            },
            {
              text: "Loader",
              link: "/views/03_工程搭建/04_构建器/01_Webpack/06_Loader加载器.md"
            },
            {
              text: "军哥webpack",
              link: "/views/03_工程搭建/04_构建器/01_Webpack/军哥webpack.md"
            },
            {
              text: "Babel",
              link: "/views/03_工程搭建/04_构建器/01_Webpack/05_Babel.md"
            }
          ]
        },
      ],

      "/views/06_业务/": [
        {
          text: "业务sense",
          items: [
            {
              text: "业务sense",
              link: "/views/06_业务/00_业务sense/index.md"
            }
          ]
        },
        {
          text: "可视化",
          items: [
            {
              text: "canvas",
              link: "/views/06_业务/01_可视化/01_canvas.md"
            },
            {
              text: "svg",
              link: "/views/06_业务/01_可视化/02_svg.md"
            },
            {
              text: "echarts",
              link: "/views/06_业务/01_可视化/03_echarts.md"
            }
          ]
        },
        {
          text: "音视频",
          items: [
            {
              text: "video/audio",
              link: "/views/06_业务/02_音视频/01_video-audio.md"
            },
            {
              text: "音视频",
              link: "/views/06_业务/02_音视频/01_音视频业务.md"
            },
            {
              text: "播放器",
              link: "/views/06_业务/02_音视频/02_视频播放器.md"
            },
            {
              text: "webRTC",
              link: "/views/06_业务/02_音视频/02_webRTC.md"
            },
            {
              text: "云存储",
              link: "/views/06_业务/02_音视频/03_云存储.md"
            }
          ]
        },

        {
          text: "表单表格",
          items: [
            {
              text: "表单",
              link: "/views/06_业务/03_表单表格/01_表单.md"
            },
            {
              text: "表格",
              link: "/views/06_业务/03_表单表格/02_表格.md"
            }
          ]
        },

        {
          text: "编辑器",
          items: [
            {
              text: "编辑器",
              link: "/views/06_业务/04_编辑器/00_编辑器.md"
            }
          ]
        },
        {
          text: "微前端",
          items: [
            {
              text: "概念",
              link: "/views/06_业务/07_微前端/01_概念.md"
            },
            {
              text: "web components",
              link: "/views/06_业务/07_微前端/02_web-components.md"
            },
            {
              text: "qiankun",
              link: "/views/06_业务/07_微前端/index.md"
            }
          ]
        },
        {
          text: "低代码",
          items: [
            {
              text: "低代码",
              link: "/views/06_业务/08_低代码/index.md"
            }
          ]
        },
        {
          text: "服务监控",
          items: [
            {
              text: "服务监控",
              link: "/views/06_业务/09_服务监控/index.md"
            }
          ]
        }
      ],
      "/views/09_常见算法/": [
        {
          text: "数据结构与算法",
          items: [
            {
              text: "二叉树",
              link: "/views/09_常见算法/01_数据结构与算法/index.md"
            }
          ]
        },
        {
          text: "设计模式",
          items: [
            {
              text: "观察者模式",
              link: "/views/09_常见算法/02_设计模式/index.md"
            }
          ]
        }
      ],
      "/views/08_运维/": [
        {
          text: "环境",
          items: [
            {
              text: "mac",
              link: "/views/08_运维/环境/mac.md"
            },
            {
              text: "windows",
              link: "/views/08_运维/环境/windows.md"
            },
          ]
        },
        {
          text: "nvm命令",
          link: "/views/08_运维/nvm/nvm命令.md"
        },
        {
          text: "nginx",
          link: "/views/08_运维/nginx/nginx.md"
        },
        {
          text: "版本控制",
          items: [
            {
              text: "git",
              link: "/views/08_运维/版本控制/git.md"
            },
            {
              text: "svn",
              link: "/views/08_运维/版本控制/svn.md"
            }
          ]
        },
        {
          text: "adb",
          link: "/views/08_运维/adb/adb.md"
        },
        {
          text: "linux",
          link: "/views/08_运维/linux/linux.md"
        },
        {
          text: "部署",
          link: "/views/08_运维/部署.md"
        },
        {
          text: "github",
          link: "/views/08_运维/github/修改hosts.md"
        },
      ],
      "/views/07_AI/": [
        {
          text: "基础概念",
          items: [
            {
              text: "大语言模型",
              link: "/views/07_AI/01_大语言模型.md"
            },
            {
              text: "模型服务",
              link: "/views/07_AI/02_模型服务.md"
            },
            {
              text: "AI应用",
              link: "/views/07_AI/03_AI应用.md"
            }

          ]
        }
      ]
    },
    socialLinks: [
      { icon: "vitejs", link: "https://vitejs.cn/vitepress/" },
      { icon: "github", link: "https://github.com/vwangyi/elpis/" },

      {
        icon: {
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 410 404" fill="none">
  <path d="M399.641 59.5246L215.643 388.545C211.844 395.338 202.084 395.378 198.228 388.618L10.5817 59.5563C6.38087 52.1896 12.6802 43.2665 21.0281 44.7586L205.223 77.6824C206.398 77.8924 207.601 77.8904 208.776 77.6763L389.119 44.8058C397.439 43.2894 403.768 52.1434 399.641 59.5246Z" fill="url(#vite_logo_gradient)"/>
  <path d="M292.965 1.5744L156.801 28.2552C154.563 28.6937 152.906 30.5903 152.771 32.8664L144.395 174.33C144.198 177.662 147.258 180.248 150.51 179.498L188.42 170.749C191.592 170.016 194.443 172.983 193.762 176.168L184.012 222.17C183.323 225.397 186.24 228.335 189.466 227.669L210.736 223.346C213.966 222.679 216.884 225.626 216.187 228.853L205.27 273.673C204.468 277.248 207.729 280.304 211.224 279.23L227.216 274.527C230.717 273.451 233.977 276.521 233.164 280.099L220.931 338.81C219.74 344.11 226.675 347.526 229.569 343.261L238.883 329.245C240.502 326.963 243.875 326.753 245.77 328.809L310.956 400.756C316.082 406.345 325.1 401.743 323.237 394.668L334.758 246.135C336.179 234.904 323.451 226.977 314.816 233.76L255.718 280.179C252.467 282.725 247.823 280.552 247.456 276.373L244.011 232.542C243.675 228.766 247.339 225.776 250.887 226.889L348.79 259.914C357.519 262.881 364.784 252.441 362.014 244.159L391.369 133.043C398.419 110.861 375.145 92.6286 355.634 104.212L279.226 149.156C275.766 151.248 271.306 148.491 271.4 144.512L270.846 82.0037C270.882 78.3337 274.323 75.7113 277.735 76.7573L299.491 83.6183C307.476 86.1579 315.21 73.645 307.591 67.4877L282.435 47.6132C278.765 44.6106 279.652 38.7563 284.121 37.0228L292.965 1.5744Z" fill="url(#vite_logo_gradient_2)"/>
  <defs>
    <linearGradient id="vite_logo_gradient" x1="6.00017" y1="32.9999" x2="235" y2="344" gradientUnits="userSpaceOnUse">
      <stop stop-color="#41D1FF"/>
      <stop offset="1" stop-color="#BD34FE"/>
    </linearGradient>
    <linearGradient id="vite_logo_gradient_2" x1="194.651" y1="8.81818" x2="236.076" y2="292.989" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FFEA83"/>
      <stop offset="0.0833333" stop-color="#FFDD35"/>
      <stop offset="1" stop-color="#FFA800"/>
    </linearGradient>
  </defs>
</svg>`  },
        link: 'https://vitejs.cn/vitepress/'
      }
    ]
  }
});
