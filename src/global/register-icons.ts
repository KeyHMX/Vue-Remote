//全局注册icon图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import type { App } from 'vue'

//好吧 这里elementui直接提供方法
function registerIcons(app: App<Element>) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}

export default registerIcons
