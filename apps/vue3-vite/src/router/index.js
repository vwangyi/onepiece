import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue')
  }

  // {
  //   // 无导航瀑布流页面
  //   path: '/main_flow',
  //   name: 'main_flow',
  //   component: () => import('@/views/MultiMode/views/Home/FlowPage.vue')
  // },
  // {
  //   path: '/multi_mode',
  //   component: standrad,
  //   children: [
  //     {
  //       path: '',
  //       name: 'multi_mode',
  //       components: {
  //         main_MultiMode
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/main_face',
  //   name: 'main_face',
  //   component: () => import('@/views/main_face/index.vue')
  // },
  // {
  //   path: '/main_model',
  //   name: 'main_model',
  //   component: () => import('@/views/MultiMode/views/index.vue')
  // },
  // {
  //   path: '/',
  //   name: 'host',
  //   redirect: '/main_bootMode'
  // },
  // {
  //   path: '/main',
  //   name: 'main',
  //   component: main,
  //   redirect: 'main_aivoice',
  //   children: [
  //     {
  //       path: 'main_aivoice',
  //       name: 'main_aivoice',
  //       component: main_aivoice,
  //       meta: {
  //         keepAlive: true // 需要被缓存(测试Router keep alive机制)
  //       }
  //     },
  //     {
  //       path: 'main_film', //其它页
  //       name: 'main_film',
  //       component: () => import('@/views/main_film/App.vue'),
  //       meta: {
  //         keepAlive: true // 需要被缓存(测试Router keep alive机制)
  //       }
  //     },
  //     {
  //       path: 'main_addNav', //添加更多
  //       name: 'main_addNav',
  //       component: () => import('@/views/NavMenu/NavAddComp.vue'),
  //       meta: {
  //         keepAlive: true // 需要被缓存(测试Router keep alive机制)
  //       }
  //     }
  //   ]
  // },

  // {
  //   path: '/main_seriesPlayer', // 子路由路径，相对于/main路径
  //   name: 'main_seriesPlayer',
  //   component: () => import('@/views/channelPlayer/SeriesPlayer.vue') // 子路由对应的组件
  //   // meta: {
  //   //   keepAlive: true // 需要被缓存(测试Router keep alive机制)
  //   // }
  // },
  // {
  //   path: '/main_detail',
  //   name: 'main_detail',
  //   component: main_detail
  // },
  // {
  //   path: '/main_ImagesFillPage/:imgUrl',
  //   name: 'main_ImagesFillPage',
  //   component: () => import('@/components/imageLoad/ImagesFill.vue')
  // },
  // {
  //   path: '/main_modeSelection',
  //   name: 'main_modeSelection',
  //   component: () => import('@/components/modePage/modeSelection.vue')
  //   // meta: {
  //   //   keepAlive: true // 需要被缓存(测试Router keep alive机制)
  //   // }
  // },
  // {
  //   path: '/main_bootMode', //开机页
  //   name: 'main_bootMode',
  //   component: () => import('@/components/modePage/bootMode.vue')
  //   // meta: {
  //   //   keepAlive: true // 需要被缓存(测试Router keep alive机制)
  //   // }
  // },
  // {
  //   path: '/main_deepseek',
  //   name: 'main_deepseek',
  //   component: () => import('@/views/deepSeekZone/DeepSeekChatPage.vue')
  // },
  // {
  //   title: '切离儿童模式与观看模式时长设置验证',
  //   name: 'main_problem',
  //   path: '/main_problem',
  //   component: () => import('@/views/problem/index.vue')
  // },
  // {
  //   title: '家长管理中心-儿童模式观看设置',
  //   name: 'main_childSet',
  //   path: '/main_childSet',
  //   component: () => import('@/views/childSet/ChildSet.vue')
  // },
  // {
  //   title: '家长管理中心-儿童模式观看设置-时长',
  //   name: 'main_timeSet',
  //   path: '/main_timeSet',
  //   component: () => import('@/views/childSet/TimeSet.vue')
  // }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.jump = function () {
  return 12;
};
export default router;
