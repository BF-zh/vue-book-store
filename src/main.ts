import { createHead } from '@vueuse/head'
import persistedstate from 'pinia-plugin-persistedstate'
import { DataLoaderPlugin } from 'unplugin-vue-router/data-loaders'
import App from './App.vue'
import router from './router'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import 'element-plus/theme-chalk/src/message.scss' // 引入 element-plus 的 message 样式

const pinia = createPinia()
pinia.use(persistedstate)

createApp(App)
  .use(DataLoaderPlugin, { router })
  .use(router)
  .use(createHead())
  .use(pinia)
  .mount('#app')
