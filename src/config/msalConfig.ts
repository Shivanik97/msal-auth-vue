import {
  PublicClientApplication,
  type AccountInfo,
  type RedirectRequest
} from '@azure/msal-browser'
import { reactive } from 'vue'

export const msalConfig = {
  auth: {
    clientId: '0e69c557-52c8-4680-9c26-e3899a493e01',
    authority: 'https://login.microsoftonline.com/8f6bd982-92c3-4de0-985d-0e287c55e379',
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
