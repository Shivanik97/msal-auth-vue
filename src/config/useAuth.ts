import { ref, type Ref } from 'vue'
import { type AuthenticationResult, type AccountInfo, type RedirectRequest} from '@azure/msal-browser'
import { myMSALObj } from './msalConfig'
interface AuthComposition {
  isAuthenticated: Ref<boolean>
  user: Ref<AccountInfo | null>
  login: () => Promise<void>
  logout: () => void
  handleRedirect: () => Promise<AuthenticationResult | null>
}
export function useAuth(): AuthComposition {
  const isAuthenticated = ref(false)
  const user = ref<AccountInfo | null>(null)

  const login = async () => {
    try {
      // Check if MSAL is initialized before using it
      if (!myMSALObj) {
        throw new Error('MSAL not initialized. Call initializeMsal() before using MSAL API.')
      }
      await myMSALObj.loginRedirect();
      isAuthenticated.value = true
    } catch (error) {
      console.error('Login error:', error)
    }
  }
  const handleRedirect = async () => {
    return await myMSALObj.handleRedirectPromise();
  };
  
  const logout = () => {
    // Check if MSAL is initialized before using it
    if (!myMSALObj) {
      throw new Error('MSAL not initialized. Call initializeMsal() before using MSAL API.')
    }
    myMSALObj.logoutRedirect()
    isAuthenticated.value = false
    user.value = null
  }
  return { isAuthenticated, user, login, logout, handleRedirect }
}