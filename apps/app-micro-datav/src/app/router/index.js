import { createWebHistory, createRouter } from 'vue-router';

const routes = [
  { path: '/datav/list', component: () => import('@/pages/home') },
  // {
  //   path: '/',
  //   redirect: '/orders/list',
  // },
  // {
  //   path: '/orders/:pathMatch(.*)*',
  //   component: RoutePortal,
  //   meta: {
  //     appName: 'order',
  //   },
  // },
  // {
  //   path: '/finance/:pathMatch(.*)*',
  //   component: RoutePortal,
  //   meta: {
  //     appName: 'finance',
  //   },
  // },
  // {
  //   path: '/:pathMatch(.*)*',
  //   redirect: '/orders/list',
  // },
];

export function createDatavRouter(history) {
  return createRouter({
    history,
    routes,
  });
}
