// 统一导出 UI 组件即可，外部页面（Pages）直接将此组件放置在商品卡片或详情页中
export { default as AddToCartButton } from './ui/index.vue';

// 🔒 注意：不要在这里导出 model/store.ts！
// 外部不需要直接调用 useAddToCartStore，所有状态和行为都被封装在组件内部了。
