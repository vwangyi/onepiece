import { registerMicroApps, start } from 'qiankun';

let started = false; // 是否启动乾坤的标识
const microApps = [
  {
    name: 'datav-app',
    label: 'datav子应用',
    entry: '//localhost:5020', // 子应用的入口地址
    activeRule: '/datav/', // 路由前缀
    defaultPath: '/datav/list', // 子应用的默认路由 完整路由
    container: '#subapp-viewport',
  },
];

export function getMicroApps() {
  return microApps;
}

export function setupQiankun() {
  if (started) return;
  const m = microApps.map(app => {
    return {
      name: app.name,
      entry: app.entry,
      activeRule: app.activeRule,
      container: app.container,
    };
  });
  registerMicroApps(m);
  start();
  started = true;
}
