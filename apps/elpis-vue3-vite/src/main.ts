import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

console.log('环境sddd', import.meta.env);
console.log('app.config.globalProperties.msg = ', app.config.globalProperties);
app.mount('#app');
