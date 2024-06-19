<template>
  <router-view />
</template>

<script setup lang="ts">
import { useAuthStore } from 'src/stores/authStore';
import { onBeforeMount } from 'vue';
import { api } from './boot/axios';

async function initializeApp () {
  await api.post('/initialize-app').then(response => {
    console.log(JSON.stringify(response.data))
  })
}
onBeforeMount (async () => {
  await initializeApp()
})
</script>
