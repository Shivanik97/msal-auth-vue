import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { msalInstance } from '@/config/msalConfig'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAdmin: true }
    }
  ]
})
router.beforeEach(async (to, from) => {
  const accounts = msalInstance.getAllAccounts()
  if (to.matched.some((record) => record.meta.requiresAdmin)) {
    const userHasAdminRole = accounts.some((account) =>
      account.idTokenClaims?.roles?.includes('Enable.PO')
    )
    if (!userHasAdminRole) {
      return { name: 'login' }
    }
  }
  return true
})
export default router
