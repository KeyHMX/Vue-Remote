import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
      //这里要添加一个路由守卫的逻辑
    },
    {
      path: '/login',
      component: () => import('@/views/login/login.vue')
    },
    {
      path: '/main',
      component: () => import('@/views/main/main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('@/views/not-found/not-found.vue')
    }
  ]
})

//路由守卫
router.beforeEach((to) => {
  if (to.path === '/main') {
    ///注意是topath
    const token = localCache.getCache(LOGIN_TOKEN)
    // return token ? '/main' : '/login'
    if (!token) return '/login'
  }
})

export default router
