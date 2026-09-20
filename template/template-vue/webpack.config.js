const path = require('node:path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const package = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
//  MiniCssExtractPlugin 将 CSS 从 JavaScript 中提取出来，生成独立的 .css 文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin'); // 压缩css
// const TerserWebpackPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

dotenv.config({ path: path.resolve(__dirname, '.env') });

module.exports = (_, { mode }) => {
  dotenv.config({
    path: path.resolve(__dirname, `.env.${mode}`),
    override: true
  });
  const isDev = mode === 'development';

  console.log('BundleAnalyzerPlugin', typeof process.env.BundleAnalyzerPlugin);
  return {
    mode,
    devtool: isDev ? 'source-map' : false,
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.vue', '.jsx', '.scss', '.css'],
      alias: { '@': path.resolve(__dirname, './src') }
    },
    entry: './src/main.js',
    output: {
      path: path.resolve(__dirname, './dist'),
      clean: true,
      chunkFilename: 'js/[name]_[chunkhash:8].chunk.js',
      assetModuleFilename: 'assets/[name]_[hash:8][ext][query]',
      filename: 'js/[name]_[contenthash:8].bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: {
            loader: 'vue-loader'
          }
        },
        // {
        //   test: /\.(ts|tsx)$/,
        //   use: [
        //     {
        //       loader: 'babel-loader'
        //     },
        //     {
        //       loader: 'ts-loader',
        //       options: {
        //         // transpileOnly: true 表示 让 ts-loader 只处理编译，不进行类型检查 提高编译速度
        //         // 类型检查交给 ForkTsCheckerWebpackPlugin
        //         transpileOnly: true,
        //         // 支持 .vue 文件中的 TypeScript/TSX
        //         appendTsSuffixTo: [/\.vue$/],
        //         appendTsxSuffixTo: [/\.vue$/],
        //         // 配置项
        //         configFile: path.resolve(rootPath, 'tsconfig.json')
        //       }
        //     }
        //   ],
        //   exclude: /node_modules/
        // },
        // {
        //   test: /\.jsx?$/, // 匹配js 或 jsx 文件
        //   exclude: /node_modules/, // 排除 node_modules 目录下的文件
        //   use: [
        //     {
        //       loader: 'thread-loader', // 开启多线程处理babel-loader
        //       options: {
        //         workers: 2 // 设置线程数，默认为 require("os").cpus().length - 1
        //       }
        //     },
        //     {
        //       loader: 'babel-loader', // 使用babel-loader处理js文件
        //       options: {
        //         // presets: ['@babel/preset-env'], // 预设在babel.config.js中使用了 这里就不用了
        //         cacheDirectory: true, // 启用babel-loader缓存，提高构建速度
        //         cacheCompression: false, // 关闭缓存文件压缩，提升性能，因为压缩需要额外的CPU资源
        //         plugins: ['@babel/plugin-transform-runtime'] // 使用transform-runtime插件，减少冗余代码，提高性能
        //       }
        //     }
        //   ]
        // },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader, // style-loader 改为 MiniCssExtractPlugin.loader
            // "css-loader", // 将 CSS 转化成 CommonJS 模块
            {
              loader: 'css-loader',
              options: {
                // ✅ 显式开启 icss 模式，确保 :export 能被识别为 JS 导出
                modules: {
                  mode: 'icss'
                }
              }
            },
            // "sass-loader", // 将 Sass 编译成 CSS
            {
              loader: 'sass-loader',
              options: {
                //   // ✅ 核心配置：全局注入 SCSS 变量
                //   // 路径需要根据你实际 variables.scss 的位置调整
                //   data: `@import "@/styles/variables.scss";` // 可以在 vue的script中 import xxx from 'xxx.scss'

                // ✅ 添加 sassOptions 配置
                sassOptions: {
                  quietDeps: true, // 沉默依赖包 (node_modules) 中的警告
                  // 或者完全沉默所有警告 (不推荐，会漏掉你自己的代码警告)
                  logger: {
                    warn: () => {}
                  }
                }
              }
            }
          ]
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|webp)$/i,
          type: 'asset', // 用内置asset 处理图片
          generator: { filename: 'img/[hash:8][ext][query]' },
          parser: {
            dataUrlCondition: {
              maxSize: 10 * 1024 // 10kb  单位是b  字节byte  乘1024 转 kb了
            }
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.+)?$/, // 匹配字体文件
          type: 'asset/resource', // // 用内置asset/resource 处理字体
          generator: { filename: 'font/[hash][ext][query]' }
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.+)?$/,
          type: 'asset/resource', // 视频或其他 原封不动的输出到指定地方 都放 assets
          generator: { filename: 'assets/[hash][ext][query]' }
        }
      ]
    },
    plugins: [
      isDev
        ? null
        : new BundleAnalyzerPlugin({
            // 生成一个静态的 HTML 报告文件，而不是启动一个服务器
            analyzerMode: 'static',
            // 报告文件的名称
            reportFilename: 'bundle-report.html',
            // 生成报告后是否自动在浏览器中打开
            openAnalyzer: true
          }),
      // new ForkTsCheckerWebpackPlugin({
      //   typescript: {
      //     configFile: path.resolve(rootPath, 'tsconfig.json')
      //   },
      //   async: process.env.NODE_ENV === 'development'
      // }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './public/index.html')
        //      favicon: path.resolve(rootPath, './public/favicon.ico'), // 指定 favicon 路径
        // title: 'WANGYI',
        // // 产物 最终模版 输出路径
        // // filename: path.resolve(rootPath, './dist/', `index.html`),
        // filename: 'index.html', // ✅ 改为相对路径，不要用绝对路径
        // inject: false, // inject: false + <%= htmlWebpackPlugin.tags.headTags.join('\n    ') %>
        // minify: true ? {
        //   removeComments: true, // 移除注释
        //   collapseBooleanAttributes: true, // 让 defer="defer" 变成 defer
        //   collapseWhitespace: true, // 折叠空白
        //   collapseInlineTagWhitespace: true,
        //   removeRedundantAttributes: true, // 移除冗余属性
        //   removeScriptTypeAttributes: true, // 移除 script 的 type 属性
        //   removeStyleLinkTypeAttributes: true, // 移除 style/link 的 type 属性
        //   conservativeCollapse: true,
        //   minifyCSS: true, // 压缩 CSS
        //   minifyJS: true, // 压缩 JS
        //   minifyURLs: true, // 压缩 URL
        //   removeEmptyAttributes: true, // 移除空属性
        //   keepClosingSlash: true // 保留自闭合标签的斜杠
        // } : false,
      }),
      new VueLoaderPlugin(),
      // 4. 把变量注入前端业务代码，src 中可用 __APP_NODE_ENV__ 访问 process.env.NODE_ENV
      new webpack.DefinePlugin({
        __APP_NODE_ENV__: JSON.stringify(process.env.NODE_ENV),
        __APP_PORT__: JSON.stringify(process.env.PORT),
        __APP_VERSION__: JSON.stringify(package.version),
        __VUE_OPTIONS_API__: true, // Vue3是否支持 Options API
        __VUE_PROD_DEVTOOLS__: false, // Vue3生产环境是否启用 DevTools Vue 调试工具
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false // 生产环境水合失败时 是否显示详细信息
      })
    ].filter(Boolean),
    devServer: {
      port: Number(process.env.PORT),
      open: true,
      hot: true,
      historyApiFallback: true
      //   proxy: [
      //     {
      //       context: ['/api'], // 注意：属性名从 key 改为 context 数组
      //       target: 'http://localhost:3002',
      //       changeOrigin: true
      //     }
      //   ]
    },
    /**
     * 配置打包输出优化 （配置代码分割 模块合并 缓存 TreeShaking 代码压缩等优化策略）
     */
    optimization: {
      // 全局关闭 prefetch
      // prefetchChunks: false,
      /**
       * 把 js 文件 按照 改动和引用次数 区分出3种类型 以达到更好利用浏览器缓存的效果
       * 根据经验 配置webpack 把js代码打包出3种类型
       * 1. vendor: 第三方库node_modules   [基本不会改动 除非依赖版本升级]
       * 2. common: 业务组件代码的公共部分抽取出来 [改动较少]
       * 3. entry.{page}: 不用页面 entry 里的业务组件代码的差异部分 [经常改动]  
       */
      splitChunks: {
        // chunks: 'async', 表示 import() 异步引入
        chunks: 'all', // 对同步模块和异步模块都进行分割
        maxAsyncRequests: 10, // 每次异步加载的最大并行请求数
        maxInitialRequests: 10, // 入口点最大并行请求数
        cacheGroups: {
          // import(/* webpackChunkName: "@wangeditor/editor-for-vue" */ '@wangeditor/editor-for-vue'),
          // import(/* webpackChunkName: "@wangeditor/editor" */ '@wangeditor/editor'),
          // import(/* webpackChunkName: "@wangeditor/plugin-md" */ '@wangeditor/plugin-md')

          // 第三方 wangeditor
          // 专门给 wangeditor 设立的分组  把wangeditor踢出vendor分组
          'wangeditor': {
            // 指定为异步 配合 import()  重要 重要 重要 重要 重要 重要 重要 重要   index.html中不会直接引入当前js
            // 没有import() 此模块就相当于没有配置
            chunks: 'all',
            name: 'wangeditor', // 打包后的文件名会包含这个名字
            test: /[\\/]node_modules[\\/](@wangeditor|wangeditor)/, // 正则匹配包名
            priority: 50, // 【非常重要】优先级必须比 vendor 高！
            // enforce: true,   // 强制生效，即使体积很小也单独打包
            reuseExistingChunk: true, // 允许复用
            filename: 'js/[name]_[contenthash:6].js' // 打包后的文件名会包含这个名字
          },

          'echarts': {
            chunks: 'all',
            name: 'echarts',
            test: /[\\/]node_modules[\\/](echarts|@echarts)/, // 正则匹配包名
            priority: 50, // 【非常重要】优先级必须比 vendor 高！
            enforce: true, // 强制生效，即使体积很小也单独打包
            reuseExistingChunk: true, // 允许复用
            filename: 'js/[name]_[contenthash:6].js' // 打包后的文件名会包含这个名字
          },

          'ant-design-vue': {
            chunks: 'all',
            name: 'ant-design-vue',
            test: /[\\/]node_modules[\\/](ant-design-vue|@ant-design-vue)/, // 正则匹配包名
            priority: 50, // 【非常重要】优先级必须比 vendor 高！
            enforce: true, // 强制生效，即使体积很小也单独打包
            reuseExistingChunk: true, // 允许复用
            filename: 'js/[name]_[contenthash:6].js' // 打包后的文件名会包含这个名字
          },
          'vue': {
            chunks: 'all',
            name: 'vue',
            test: /[\\/]node_modules[\\/](vue|@vue)/, // 正则匹配包名
            priority: 50, // 【非常重要】优先级必须比 vendor 高！
            enforce: true, // 强制生效，即使体积很小也单独打包
            reuseExistingChunk: true, // 允许复用
            filename: 'js/[name]_[contenthash:6].js' // 打包后的文件名会包含这个名字
          },

          // 第三方依赖库
          'vendors': {
            chunks: 'all',
            // 把node_modules中的文件 打包为单独的一个chunk 取名为vendor
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            priority: 10, // 优先级 数字越大 优先级越高
            // enforce: true, // 为true 强制执行 表示 忽略 import的分割
            // enforce: false, // 为false，允许其他规则介入
            reuseExistingChunk: true // 复用已有的公共 chunk
            // filename: '[name].js', // 会多生成一个js 不知道什么意思
          },
          /**
           * 公共模块
           * 打包为公共模块的规则就是 被2处引用的文件 即视为公共模块 就会打包为common里面
           */
          'common': {
            chunks: 'all',
            test: /[\\/](components|utils|common)[\\/]/, // 只匹配这些目录
            name: 'common', // 模块名称
            minChunks: 2, // 被2处引用即归为公共模块
            minSize: 1, // 最小分割文件大小设置为 1字节
            priority: 5, // 优先级 数字越大 优先级越高 比 第三方依赖库 优先级高
            reuseExistingChunk: true, // 复用已有的公共 chunk
            enforce: true // 强制拆分（如果前面条件都满足但依旧不生效，可尝试）
          },
          // xx: {}
          'common-css': {
            name: 'common-css',
            test: /\.css$/,
            minChunks: 1, // 被 2 个及以上 chunk 引用才提取
            minSize: 0, // 不限制最小体积
            priority: 100,
            enforce: true, // 强制提取
            reuseExistingChunk: true
            // ❌ 不要写 filename，写了也无效
          }
        }
      },
      // 将 webpack运行时 生成的代码 单独打包到 runtime.js 比如： runtime~entry.dashboard_9183948e.js
      // runtimeChunk: true,
      runtimeChunk: {
        name: entrypoint => `runtime_${entrypoint.name}` // 指定输出到 runtime 文件夹
      },
      minimize: true,
      minimizer: [
        // new CssMinimizerWebpackPlugin(), // 压缩css
        // 压缩js
        // new TerserWebpackPlugin({
        //   test: /\.js(\?.*)?$/i, // 匹配需要压缩的文件
        //   // 注意：不要设置 include/exclude！
        //   // 之前 include: /\/src/ + exclude: /node_modules/ 会导致
        //   // echarts / ant-design-vue / vendor 等大 chunk 完全不被压缩（实测 8.6MB -> 2.6MB）
        //   // cache: true, // 使用缓存 加速构建过程  webpack5 已经移除了 会报错
        //   // 多进程并行压缩
        //   parallel: true, // 默认： true表示 ${os.cpus().length - 1} 个进程 用多少个进程应该随着项目规模调整 因为每个线程初始化启动需要耗时
        //   // parallel: cpu,
        //   // 提取注释到单独文件
        //   // extractComments: true, // 将注释提取到 LICENSE 文件
        //   // 或者自定义注释提取
        //   extractComments: {
        //     condition: /^\**!|@preserve|@license|@cc_on/i,
        //     filename: ({ basename }) => `license/${basename}.LICENSE.txt`,
        //     banner: path => `License information can be found in ${path}`
        //   },
        //   // Terser 压缩选项
        //   terserOptions: {
        //     sourceMap: true, // 启用 source map
        //     format: {
        //       comments: false // 移除所有注释
        //     },
        //     compress: {
        //       drop_console: true, // 移除 console.log
        //       drop_debugger: true, // 移除 debugger
        //       pure_funcs: ['console.log'], // 移除指定函数
        //       passes: 2, // 多次压缩优化
        //       sequences: true, // 连续声明变量
        //       booleans: true, // 优化布尔值
        //       loops: true, // 优化循环
        //       unused: true, // 删除未使用的变量
        //       warnings: false // 不显示警告
        //     },
        //     mangle: true, // 混淆变量名
        //     toplevel: true, // 顶层变量混淆
        //     keep_classnames: false, // 不保留类名
        //     keep_fnames: false // 不保留函数名
        //   }
        // })
      ]
    }
  };
};
