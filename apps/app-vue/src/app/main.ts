import { createApp } from 'vue';
import type { Plugin, App as AppType } from 'vue';
import { createPinia } from 'pinia';
import App from './App';
import router from './router';
import Antd from 'ant-design-vue';
import './styles/index.css';
import './iconfont/iconfont.css';
import { VueQueryPlugin } from '@tanstack/vue-query';

const app: AppType = createApp(App);
app.use(createPinia());
app.use(router);
app.use(VueQueryPlugin);
app.use(Antd as unknown as Plugin);
app.mount('#app');
