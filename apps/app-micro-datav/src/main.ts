import './public-path';
import { createApp } from 'vue';
import type { App as AppType } from 'vue';
// import './style.css';
import App from './App.vue';

createApp(App).mount('#app');

let app: AppType | null = null;

// 独立运行时，直接挂载
if (!window.__POWERED_BY_QIANKUN__) {
  createApp(App).mount('#app');
}

// 给 qiankun 导出生命周期
export async function bootstrap() {
  console.log('子应用 bootstrap');
}

// 定义主应用传递的自定义数据
type HostProps = {
  // 这里放你主应用实际传过来的字段，例如：
  user?: { name: string };
  theme?: string;
};

// 合并自定义 props 与 qiankun 注入的 container
type MountProps = HostProps & { container: HTMLElement };

export async function mount(props: MountProps) {
  console.log('子应用 mount', props);
  app = createApp(App);
  app.mount('#app');
}

export async function unmount() {
  console.log('子应用 unmount');
  app?.unmount();
  app = null;
}
