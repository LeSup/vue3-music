import { createRouter, createWebHistory } from 'vue-router'
import VRecommend from '@/views/Recommend/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: VRecommend,
      children: [
        {
          path: ':id',
          component: () => import('../views/AlbumDetail/index.vue')
        }
      ]
    },
    {
      path: '/singer',
      component: () => import('../views/Singer/index.vue'),
      children: [
        {
          path: ':id',
          component: () => import('../views/singerDetail/index.vue')
        }
      ]
    },
    {
      path: '/rank',
      component: () => import('../views/Rank/index.vue')
    },
    {
      path: '/search',
      component: () => import('../views/Search/index.vue')
    }
  ]
})

export default router
