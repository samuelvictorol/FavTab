<template>
  <q-layout view="hHh lpR fFf">

    <q-header class="bg-grey-10 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img style="filter:grayscale(1) invert(1)" src="https://images.vexels.me/media/users/3/128482/isolated/preview/9ac31559c1891fa1d0b10364d2a0b0d6-purple-music-note-icon-svg.png">
          </q-avatar>
          <span class="q-ml-xs font-decorative-1">FavTab</span>
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer class="bg-grey-10" v-model="rightDrawerOpen" side="right">
      <ul class="w100 column q-gutter-y-md q-mt-xl justify-center items-center">
        <q-avatar v-if="isAuthenticated"  size="140px" font-size="52px" color="grey-3" text-color="white">
          <img :src="authStore.getInfoImg()" alt="avatar do usuário">
        </q-avatar>
        <q-btn class="q-btn-w80" icon="login" color="primary" label="fazer login" v-if="!isAuthenticated" @click="toggleLogin()"/>
        <p v-if="isAuthenticated" class="text-white mid-opacity text-bold"><i>{{authStore.getInfoLogin()}}</i></p>
        <q-btn class="q-btn-w80 text-white" icon="library_music" color="grey-9" @click="navigateTo('/profile')"  label="Meus Repertórios" v-if="isAuthenticated"/>
        <q-btn class="q-btn-w80 text-white" icon="home" @click="navigateTo('/')" color="grey-9" label="Homepage"/>
        <!-- <q-btn class="q-btn-w80 text-black" icon="timer" @click="toggleRightDrawer()" color="" label="Configurações"/>
        <q-btn class="q-btn-w80 text-black" icon="timer" @click="toggleRightDrawer()" color="" label="Feed"/>
        <q-btn class="q-btn-w80 text-black" icon="timer" @click="toggleRightDrawer()" color="" label="Afinador"/>
        <q-btn class="q-btn-w80 text-black" icon="timer" @click="toggleRightDrawer()"  color="" label="Descobrir"/> -->
        <q-btn class="q-btn-w80 text-red-5" icon="logout" @click="logout()" flat v-if="isAuthenticated" label="Fazer Logout"/>
      </ul>
    </q-drawer>

    <q-page-container class="relative">
      <router-view />
      <LoginComponent @toggleLogin="toggleLogin()" v-if="isLogin"/>
      <div v-if="loading" class="loading">
        <q-spinner-bars
        color="green"
        size="2em"
      />
      </div>
    </q-page-container>

  </q-layout>
</template>

<script lang="ts" setup>
import LoginComponent from 'src/components/LoginComponent.vue';
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/authStore';

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
const rightDrawerOpen = ref(false)
const router = useRouter()

const loading = ref(false)
const isLogin = ref(false)
function toggleLogin () {
  rightDrawerOpen.value = false
  isLogin.value = !isLogin.value
}

function toggleRightDrawer () {
  rightDrawerOpen.value = !rightDrawerOpen.value
}

function navigateTo( routeStr: string) {
  router.push(routeStr)
}

function logout() {
  authStore.logout()
  router.replace('/')
  loading.value = true
  setTimeout(() => {
    window.location.reload()
  }, 1200)
}

</script>
<style scoped>
.q-btn-w80{
  width: 80%;
}
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(17, 17, 17, 0.5);
  backdrop-filter: blur(5px);
  z-index: 9999!important;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
