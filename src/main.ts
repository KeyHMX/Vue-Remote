import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'normalize.css'
import App from './App.vue'

import '@/assets/css/index.less'
import router from './router'
import pinia from './stores'
import registerIcons from './global/register-icons'

const app = createApp(App)

app.use(registerIcons)
app.use(pinia)
app.use(createPinia())
app.use(router)
app.mount('#app')
