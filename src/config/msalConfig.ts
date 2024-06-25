import {
  PublicClientApplication,
  type AccountInfo,
  type RedirectRequest
} from '@azure/msal-browser'
import { reactive } from 'vue'

export const msalConfig = {
  auth: {
    clientId: 'Your client id',
    authority: 'https://login.microsoftonline.com/your_tenant_id',
    redirectUri: window.location.origin, // Replace with your actual redirect URI
    postLogoutUri: window.location.origin
  },
  cache: {
    cacheLocation: 'sessionStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false
  }
}
export const graphScopes: RedirectRequest = {
  scopes: ['user.read', 'openid', 'profile']
}
export const state = reactive({
  isAuthenticated: false,
  user: null as AccountInfo | null
})

export const msalInstance = new PublicClientApplication(msalConfig)
