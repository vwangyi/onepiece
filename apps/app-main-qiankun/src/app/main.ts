import { createApp } from 'vue';
// import './style.css';
import App from './App.vue';
import { registerMicroApps, start } from 'qiankun';
import router from './router';
registerMicroApps([
  {
    name: 'datav',
    entry: '//localhost:5174',
    container: '#micro-container',
    activeRule: 'vue-child',
  },
]);

start();

const app = createApp(App);
app.use(router);
app.mount('#app');
