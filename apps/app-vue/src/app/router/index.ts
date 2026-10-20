import { createRouter, createWebHistory } from 'vue-router';
import { HomePage } from '@/pages/home';
import { ImageProcessPage } from '@/widgets/image-process';
import type { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/todo',
    name: 'ToDo',
    component: () => import('@/pages/todo')
  },
  {
    path: '/admin',
    name: 'AdminPage',
    component: () => import('@/pages/admin')
  },
  {
    path: '/datav',
    name: 'Datav',
    component: () => import('@/pages/datav')
  },
  {
    path: '/teller',
    name: 'Teller',
    component: () => import('@/pages/teller')
  },
  {
    path: '/video',
    name: 'Video',
    component: () => import('@/pages/video')
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/pages/not-found')
  }
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
