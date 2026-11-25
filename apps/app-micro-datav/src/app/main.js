import './public-path';
import { createApp } from 'vue';
import { createWebHistory } from 'vue-router';
import App from './App.vue';
import { createDatavRouter } from './router';

let app = null;
let router = null;
let mountNode = null;

async function render(props = {}) {
  if (props.container) {
    mountNode = props.container.querySelector('#app');
  } else {
    mountNode = document.querySelector('#app');
  }
  if (!mountNode) {
    throw new Error('[datav-app] 挂载容器 #app 不存在');
  }
  router = createDatavRouter(createWebHistory('/datav'));
  router.afterEach(to => (document.title = `子应用`));
  app = createApp(App);
  app.use(router);
  await router.isReady();
  app.mount(mountNode);
}

// 独自运行兜底
if (!window.__POWERED_BY_QIANKUN__) {
  void render();
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
