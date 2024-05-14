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

    <q-drawer  v-model="rightDrawerOpen" side="right">
      <ul class="w100 column q-gutter-y-md q-mt-xl justify-center items-center">
        <q-avatar  size="140px" font-size="52px" color="grey-3" text-color="white">
          <img src="https://static.vecteezy.com/system/resources/previews/035/262/622/original/ai-generated-cartoon-boy-playing-guitar-cute-little-boy-playing-music-transparent-background-png.png" alt="avatar do usuário">
        </q-avatar>
        <q-btn class="q-btn-w80 text-blue-7" @click="navigateTo('/profile')" flat dense label="Meu perfil"/>
        <q-btn class="q-btn-w80 text-white" icon="home" @click="navigateTo('/')" color="grey-9" label="Início"/>
        <!-- <q-btn class="q-btn-w80 text-black" icon="timer" @click="toggleRightDrawer()" color="" label="Configurações"/>
        <q-btn class="q-btn-w80 text-black" icon="timer" @click="toggleRightDrawer()" color="" label="Feed"/>
        <q-btn class="q-btn-w80 text-black" icon="timer" @click="toggleRightDrawer()" color="" label="Afinador"/>
        <q-btn class="q-btn-w80 text-black" icon="timer" @click="toggleRightDrawer()"  color="" label="Descobrir"/> -->
        <q-btn class="q-btn-w80" icon="login" color="primary" label="fazer login" @click="toggleLogin()"/>
        <!-- <q-btn class="q-btn-w80 text-black" icon="timer" @click="toggleRightDrawer()" color="" label="Fazer Logout"/> -->
      </ul>
    </q-drawer>

    <q-page-container class="relative">
      <router-view />
      <LoginComponent @toggleLogin="toggleLogin()" v-if="isLogin"/>
    </q-page-container>

  </q-layout>
</template>

<script lang="ts" setup>
import LoginComponent from 'src/components/LoginComponent.vue';
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const rightDrawerOpen = ref(false)
const router = useRouter()

const isLogin = ref(false)
function toggleLogin () {
  isLogin.value = !isLogin.value  
}

function toggleRightDrawer () {
  rightDrawerOpen.value = !rightDrawerOpen.value
}

function navigateTo( routeStr: string) {
  router.push(routeStr)
}

</script>
<style scoped>
.q-btn-w80{
  width: 80%;
}
</style>
