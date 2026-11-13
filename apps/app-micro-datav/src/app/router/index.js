import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', redirect: '/datav/list' },
  { path: '/datav/list', component: () => import('@/pages/home') },
  { path: '/:pathMatch(.*)*', redirect: '/datav/list' },
];

export function createDatavRouter(history = createWebHistory()) {
  return createRouter({
    history,
    routes,
  });
}
