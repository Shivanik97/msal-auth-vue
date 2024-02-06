<template>
  <div>
    <div v-if="state.isAuthenticated">
      <div>Welcome, {{ state.user.name }}!</div>
      <button @click="handleLogout">Log Out</button>
    </div>
    <div v-else>
      <button @click="handleLogin">Log In</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAuth } from './config/useAuth';
import { myMSALObj, state } from './config/msalConfig';

const { login, logout, handleRedirect } = useAuth();

const handleLogin = async () => {
  await login();
};

const handleLogout = () => {
  logout();
};

const initialize = async () => {
  try {
    await myMSALObj.initialize(); // Call the initialize function
  } catch (error) {
    console.log('Initialization error', error);
  }
};
onMounted(async () => {
  await initialize();
  await handleRedirect();
});
</script>
