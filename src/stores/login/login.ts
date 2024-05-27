import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login/login'
import type { IAccount } from '@/type/login'
import { localCache } from '@/utils/cache'
// import { mapMenusToPermissions, mapMenusToRoutes } from '@/utils/map-menus'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'
import useMainStore from '../main/main'
import { mapMenusToPermissions, mapMenusToRoutes } from '@/utils/map-manus'

interface ILoginState {
  token: string
  userInfo: any //这里可以用在线js转typescript工具
  userMenus: any
  permissions: string[]
}

const useLoginStore = defineStore('login', {
  // 如何制定state的类型
  state: (): ILoginState => ({
    //箭头函数跟返回值类型
    token: '',
    userInfo: {},
    userMenus: [],
    permissions: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1.账号登录, 获取token等信息
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      this.token = loginResult.data.token
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 2.获取登录用户的详细信息(role信息)
      const userInfoResult = await getUserInfoById(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo
      // console.log(userInfo)
      //笑死了 执着的娃

      // 3.根据角色请求用户的权限(菜单menus)
      const userMenusResult = await getUserMenusByRoleId(this.userInfo.role.id)
      const userMenus = userMenusResult.data
      this.userMenus = userMenus
      // console.log(this.userMenus)

      // 重要: 获取登录用户的所有按钮的权限

      const permissions = mapMenusToPermissions(userMenus)
      this.permissions = permissions

      // 4.进行本地缓存
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenus', userMenus)

      // 5.请求所有roles/departments数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      // const routes = mapMenusToRoutes(userMenus)
      // routes.forEach((route) => router.addRoute('main', route))

      // function loadLocalRoutes() {
      //   const localRoutes: RouteRecordRaw[] = []
      //   const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', {
      //     eager: true
      //   })
      //   //将加载的对象放到localRoutes
      //   for (const key in files) {
      //     const module = files[key]
      //     localRoutes.push(module.default)
      //   }
      //   return localRoutes
      // }

      // const localRoutes = loadLocalRoutes()

      //2 根据菜单去匹配正确路由

      // const routes: RouteRecordRaw[] = []
      // for (const menu of userMenus) {
      //   for (const submenu of menu.children) {
      //     const route = localRoutes.find((item) => item.path === submenu.url)
      //     if (route) {
      //       router.addRoute('main', route)
      //       routes.push(route)
      //       console.log(route)
      //     }
      //   }
      // }

      // 重要: 动态的添加路由
      //important！   动态路由！！！
      //从文件中读取所有路由对象先存在数组中
      // console.log(userMenus)
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => router.addRoute('main', route))
      // console.log(routes)
      // 5.页面跳转(main页面)
      router.push('/main')
    },

    loadLocalCacheAction() {
      // 1.用户进行刷新默认加载数据
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')

      if (token && userInfo && userMenus) {
        console.log('yo')
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        // 1..请求所有roles/departments数据
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()

        // 2.获取按钮的权限
        const permissions = mapMenusToPermissions(userMenus)
        this.permissions = permissions

        // 3.动态添加路由
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((route) => router.addRoute('main', route))

        //4.进行本地缓存
        localCache.setCache('userInfo', userInfo)
        localCache.setCache('userMenus', userMenus)
      }
    }
  }
})

export default useLoginStore
