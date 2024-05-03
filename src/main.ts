import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'normalize.css'
import App from './App.vue'

import '@/assets/css/index.less'
import router from './router'
import pinia from './stores'
import registerIcons from './global/register-icons'
import useLoginStore from './stores/login/login'

const app = createApp(App)

app.use(registerIcons)
app.use(pinia)
app.use(createPinia())

//试试加这个有没有效果

const loginStore = useLoginStore()
loginStore.loadLocalCacheAction()
app.use(router) //放这里更好
router.isReady()
app.mount('#app')
