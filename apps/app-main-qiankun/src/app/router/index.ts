import { createMemoryHistory, createRouter } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../../pages/home'),
  },
  // {
  //   path: '/vue-child',
  //   component: () => import('../../pages/home'),
  // },
  {
    path: '/vue-child/:pathMatch(.*)*',
    component: () => import('../../pages/home'),
    meta: {
      appName: 'order',
    },
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
