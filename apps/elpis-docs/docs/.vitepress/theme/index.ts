import DefaultTheme from 'vitepress/theme';  // 导入默认主题
import './styles/custom.css' // 导入自定义样式 需要 index.d.ts 提供ts类型 
import MyButton from './components/MyButton/MyButton.vue' // 👈 导入组件

// 2. 导出主题配置
export default {
  ...DefaultTheme, // 继承默认主题，保留原有功能
  enhanceApp({ app }) {
    // 3. 注册全局组件
    app.component('MyButton', MyButton) // 👈 现在 MyButton 可以在任何 .md 文件中使用了
  }
}