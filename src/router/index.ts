import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
// import { firstMenu } from '@/utils/map-menus'
import { createRouter, createWebHashHistory } from 'vue-router'

import { firstMenu } from '@/utils/map-manus'
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
      component: () => import('@/views/login/login.vue'),
      children: []
    },
    {
      path: '/main',
      name: 'main', //乖乖，这个可真重要啊，困住老子快一个下午
      component: () => import('@/views/main/main.vue'),
      children: []
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('@/views/not-found/not-found.vue')
    }
  ]
})

//路由守卫
router.beforeEach((to) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path.startsWith('/main') && !token) {
    ///注意是topath

    // return token ? '/main' : '/login'
    return '/login'
  }
  if (to.path === '/main') {
    return firstMenu?.url
  }
  // if (to.path === '/main') {
  //   return firstMenu?.url
  // }
})

export default router
