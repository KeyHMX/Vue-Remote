// import { mapMenusToRoutes } from '@/utils/map-menus';
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
export function mapMenusToRoutes(userMenus: any) {
  // console.log(localRoutes)
  const routes: RouteRecordRaw[] = []
  const localRoutes = loadRouteCache()
  for (const item of userMenus) {
    for (const submenu of item.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) routes.push(route)
    }
  }
  return routes
}
