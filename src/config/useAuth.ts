import { ref } from 'vue'
import { myMSALObj, state } from './msalConfig'

export function useAuth() {
  const isAuthenticated = ref(false)

  const login = async () => {
    try {
      // Check if MSAL is initialized before using it
      if (!myMSALObj) {
        throw new Error('MSAL not initialized. Call initializeMsal() before using MSAL API.')
      }
      await myMSALObj.loginRedirect()
      isAuthenticated.value = true

      const loginResponse = await myMSALObj.loginRedirect()
      isAuthenticated.value = true
      console.log('Login success:', loginResponse)
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  const logout = () => {
    if (!myMSALObj) {
      throw new Error('MSAL not initialized. Call initializeMsal() before using MSAL API.')
    }
    myMSALObj.logoutRedirect()
    isAuthenticated.value = false
    console.log('Logged out')
  }
  const handleRedirect = async () => {
    try {
      await myMSALObj.handleRedirectPromise()
      state.isAuthenticated = myMSALObj.getAllAccounts().length > 0
      state.user = myMSALObj.getAllAccounts()[0]
    } catch (error) {
      console.error('Redirect error:', error)
    }
  }

  return { isAuthenticated, login, logout, handleRedirect }
}
