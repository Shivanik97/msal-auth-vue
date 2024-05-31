import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { msalInstance } from '@/config/msalConfig'
import type { AccountInfo } from '@azure/msal-browser'

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
      component: () => import('../views/AboutView.vue')
    }
  ]
})
router.beforeEach(async (to, from) => {
  const accounts: AccountInfo[] | null = msalInstance.getAllAccounts()
  if (to.matched.some((record) => record.meta.requiresAdmin)) {
    if (
      !accounts ||
      accounts.every(
        (account) => !account.idTokenClaims || !account.idTokenClaims?.roles?.includes('Enable.PO')
      )
    ) {
      // Redirect to a login page or show an error message
      return { name: 'Login' }
    }
  }
})
export default router
