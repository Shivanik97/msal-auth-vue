<template>
  <div v-if="isAuth">
    <div>Welcome {{ user?.name }}!!</div>
    <button @click="handleLogout">Log-Out</button>
  </div>
  <div v-else>
    <button @click="handleLogin">Log-In</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAuth } from './config/useAuth';
import { myMSALObj } from './config/msalConfig';
import type { AccountInfo } from '@azure/msal-browser';

const auth = useAuth();
const isAuth = ref(false);
const user = ref<AccountInfo | null>(null);

const initialize = async () => {
  try {
    await myMSALObj.initialize(); // Call the initialize function
  } catch (error) {
    console.log('Initialization error', error);
  }
};
const handleLogin = async () => {
  await auth.login();
  isAuth.value = true;
};
const handleLogout = async () => {
  auth.logout();
  isAuth.value = false;
};
onMounted(async () => {
  await initialize();
  await auth.handleRedirect();
});
</script>
