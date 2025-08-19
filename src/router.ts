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
  const { isAuthenticated, isAdmin } = useAuthStore()
  if (to.name === 'login' && isAuthenticated) {
    return next({ name: isAdmin ? 'dashboard' : 'home' })
  }
  if (!to.meta.isPublic && !isAuthenticated) {
    return next({ name: 'login' })
  }
  next()
})

export default router
