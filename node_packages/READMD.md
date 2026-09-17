##

- 有时候 内网环境开发 且没有npm私有服务器 只能把包放项目里面

## 方式1 （npm pack）

通过 npm pack lodash-es 获取.tgz包。 lodash-es没有第三方依赖 可以通过npm pack 直接拿到.tgz包

## 方式2 （有第三方依赖通过npm-pack-all获取）

npm install -g npm-pack-all
cd node_modules/vue
npm-pack-all

在 node_modules/vue/vue-3.5.40.tgz 包
