import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@renderer/components/Layout'),
    redirect: '/video_handle',
    children: [
      {
        path: '/home',
        component: () => import('@renderer/views/home/index')
      },
      {
        path: '/video_handle',
        component: () => import('@renderer/views/video_handle/index')
      },
    ]
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
