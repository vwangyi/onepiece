import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', redirect: '/datav/list' },
  { path: '/list', component: () => import('@/pages/home') },
  { path: '/:pathMatch(.*)*', redirect: '/datav/list' },
];

export function createDatavRouter(history = createWebHistory('/datav')) {
  return createRouter({
    history,
    routes,
  });
}
