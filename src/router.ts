import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(),
  routes: setupLayouts([{
    path: '/',
    redirect: { name: 'login' },
  }, ...routes]),
})

router.beforeEach((to, _, next) => {
  //  在 definePage 中定义 meta 来控制是否需要登录
  // if (to.meta.isPublic) {
  //   next()
  // }
  // else {
  //   next({ name: 'login' })
  // }
  next()
})
// router.beforeEach((to, _, next) => {
//   const { isAuthenticated } = useAuthStore()
//   if (to.name === 'welcome' && isAuthenticated) {
//     return next({ name: 'chat' })
//   }
//   if (!to.meta.isPublic && !isAuthenticated) {
//     return next({ name: 'welcome' })
//   }
//   next()
// })

export default router
