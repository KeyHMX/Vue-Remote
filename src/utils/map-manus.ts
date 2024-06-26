// import { mapMenusToRoutes, firstMenu } from '@/utils/map-menus';
import type { RouteRecordRaw } from 'vue-router'
// import router from '@/router'

export function loadRouteCache() {
  const localRoutes: RouteRecordRaw[] = []
  const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', {
    eager: true
  })
  // console.log(files)
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }
  return localRoutes
}
export let firstMenu: any = null
//根据菜单去匹配正确的路由
export function mapMenusToRoutes(userMenus: any) {
  // console.log(localRoutes)
  const routes: RouteRecordRaw[] = []
  const localRoutes = loadRouteCache()
  // let firstMenu: any = null
  for (const item of userMenus) {
    for (const submenu of item.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      //点击一级菜单重定向
      if (route) {
        if (!routes.find((e) => e.path === item.url)) {
          routes.push({ path: item.url, redirect: route.path })
        }
        routes.push(route)
      }
      if (route && !firstMenu) firstMenu = submenu
    }
  }
  return routes
}
/**
 * 根据路径去匹配需要显示的菜单
 * @param path 需要匹配的路径
 * @param userMenus 所有的菜单
 */
export function menuToPath(path: string, userMenus: any[]) {
  for (const item of userMenus) {
    for (const subitem of item.children) {
      if (subitem.url === path) {
        return subitem
      }
    }
  }
}

export function menuToBreadCrumbs(path: string, userMenus: any[]) {
  const breadcrumbs: any[] = []
  for (const item of userMenus) {
    for (const subitem of item.children) {
      if (subitem.url === path) {
        //顶层菜单
        breadcrumbs.push({ name: item.name, path: item.url })
        //匹配菜单
        breadcrumbs.push({ name: subitem.name, path: subitem.url })
      }
    }
  }
  console.log(breadcrumbs)
  return breadcrumbs
}
