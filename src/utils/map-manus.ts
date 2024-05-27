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

/**
 * 菜单映射到id的列表
 * @param menuList
 */
export function mapMenuListToIds(menuList: any[]) {
  //开始递归
  const ids: number[] = []
  function curseId(menus: any) {
    for (const item of menus) {
      if (item.children) {
        curseId(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }
  curseId(menuList)
  return ids
}
/**
 *从菜单到按钮权限的映射
 * @param menuList
 * @returns
 */
export function mapMenusToPermissions(menuList: any[]) {
  const permissions: string[] = []
  function recursePermissions(menu: any[]) {
    for (const item of menu) {
      if (item.type === 3) permissions.push(item.permission)
      else {
        recursePermissions(item.children ?? [])
        //空数组提出递归
      }
    }
  }
  recursePermissions(menuList)
  return permissions
}
