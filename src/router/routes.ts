import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../common/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('@modules/home/presentation/pages/HomePage.vue')
      }
    ]
  },
  {
    path: '/list',
    component: () => import('../common/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('@modules/main/presentation/pages/CharacterList.vue')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@common/pages/ErrorNotFound.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('@common/pages/ErrorNotFound.vue')
  }
];

export default routes;
