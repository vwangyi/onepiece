import './public-path';
import { createApp } from 'vue';
import { createWebHistory } from 'vue-router';
import App from './App.vue';
import { createDatavRouter } from './router';

let app = null;
let router = null;
let mountNode = null;

async function render(props = {}) {
  // 不能直接用 document.querySelector('#app')，主应用根节点也是 #app
  mountNode = props.container
    ? props.container.querySelector('#app')
    : document.querySelector('#app');

  if (!mountNode) {
    throw new Error('[datav-app] 挂载容器 #app 不存在');
  }

  router = createDatavRouter(createWebHistory());
  router.afterEach(to => {
    document.title = `订单管理 `;
  });
  app = createApp(App);
  app.use(router);

  await router.isReady();
  app.mount(mountNode);
}

export async function bootstrap() {
  console.info('[datav-app] bootstrap');
}

export async function mount(props = {}) {
  await render(props);
}

export async function unmount() {
  app?.unmount();
  app = null;
  router = null;
  mountNode = null;
}

// 独立运行兜底
if (!window.__POWERED_BY_QIANKUN__) {
  void render();
}
