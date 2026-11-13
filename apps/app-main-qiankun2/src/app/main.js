import { createApp, nextTick } from 'vue';
import App from './App';
import router from './router';
import { setupQiankun } from './micro-apps';

const app = createApp(App);
app.use(router);

router.isReady().then(async () => {
  app.mount('#app'); // 本项目主应用启动挂载后 再启动qiankun
  await nextTick();
  setupQiankun();
});
