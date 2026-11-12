import { registerMicroApps, start } from 'qiankun';
const microApps = {
  order: {
    name: 'order-app',
    label: '订单子应用',
    entry: '//localhost:5174', // 子应用的入口地址
    activeRule: '/orders', // 路由前缀
    defaultPath: '/orders/list', // 子应用的默认路由 完整路由
  },
  finance: {
    name: 'finance-app',
    label: '财务子应用',
    entry: '//localhost:5175',
    activeRule: '/finance',
    defaultPath: '/finance/bills',
  },
};

let started = false; // 是否启动乾坤的标识

export function setupQiankun() {
  if (started) return;

  registerMicroApps([
    {
      name: microApps.order.name,
      entry: microApps.order.entry,
      container: '#subapp-viewport',
      activeRule: microApps.order.activeRule,
    },
    {
      name: microApps.finance.name,
      entry: microApps.finance.entry,
      container: '#subapp-viewport',
      activeRule: microApps.finance.activeRule,
    },
  ]);

  start();

  started = true;
}

export function getMicroApps() {
  return microApps;
}
