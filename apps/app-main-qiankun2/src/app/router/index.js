import { createWebHistory, createRouter } from 'vue-router';

const routes = [
  { path: '/', component: () => import('@/pages/home') },
  {
    path: '/datav/:pathMatch(.*)*',
    component: () => import('@/pages/home'),
    meta: {
      appName: 'datav',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
