

<script setup>
import { ref } from 'vue'

const count = ref(0);

// pnpm add -D webpack webpack-cli 

</script>


# Webpack核心概念

`打包入口 entry`   
`打包出口 output`   
`源码映射 SourceMap`  
`开发服务器 devServer`   
`HMR 热模替换`   
`代码分割`   
`TreeShaking 树摇`   
`loader 加载器`     
`plugins 插件`

{{ count }}

webpack的缺点 配置繁琐

esbuild是 go语言
rollup webpack 都是nodejs语言
vite 开发用 esbuild 生产用rollup 

<style module>
.button {
  color: red;
  font-weight: bold;
}
</style>