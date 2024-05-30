<template>
  <div>
    <div v-if="state.isAuthenticated">
      <div>Welcome, {{ state.user?.name }}!</div>
      <button @click="handleLogout">Log Out</button>
    </div>
    <div v-else>
      <button @click="handleLogin">Log In</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { msalService } from './config/useAuth'
import { msalInstance, state } from './config/msalConfig'

interface GetAllFeatureFlags {
  name: string
  description: string
  team: string
  environmentProperties: {
    [key: string]: {
      isEnabled: boolean
      /* eslint-disable */
      client_filters: ClientFilters[] | null
    }
  }
}
interface ClientFilters {
  name: string
  parameters: {
    audience: {
      groups: { Name: string }[] /* eslint-disable */
    }
  }
}
const { login, logout, handleRedirect, registerAuthorizationHeaderInterceptor } = msalService()
const isLoading = ref(false)
const featureFlags = ref<GetAllFeatureFlags[]>([])

const handleLogin = async () => {
  await login()
}

const handleLogout = () => {
  logout()
}

const initialize = async () => {
  try {
    await msalInstance.initialize()
    registerAuthorizationHeaderInterceptor() // Call the initialize function
  } catch (error) {
    console.log('Initialization error', error)
  }
}
const getAllFeatures = async () => {
  try {
    isLoading.value = true
    const response = await axios.get(
      'https://feature-state-tool-dev.azurewebsites.net/FeatureFlag/FeatureFlags'
    )
    featureFlags.value = response.data
  } catch (error) {
    console.error('Error fetching feature flags:', error)
  } finally {
    isLoading.value = false
  }
}
onMounted(async () => {
  await initialize()
  await handleRedirect()
  await getAllFeatures()
})
</script>
