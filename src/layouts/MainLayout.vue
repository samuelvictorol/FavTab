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

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right">
      <ul class="w100 column q-gutter-y-lg q-mt-md justify-center items-center">
        <q-avatar  size="100px" font-size="52px" color="teal" text-color="white">
          <img src="https://static.vecteezy.com/system/resources/previews/036/121/462/non_2x/ai-generated-businessman-cartoon-characters-on-transparent-background-free-png.png" alt="avatar do usuário">
        </q-avatar>
        <q-btn class="q-btn-w80" icon="login" color="primary" label="fazer login" @click="toggleLogin()"/>
        <q-btn class="q-btn-w80" icon="person" @click="toggleRightDrawer()" color="green-6" label="Meu perfil"/>
        <q-btn class="q-btn-w80 text-black" icon="timer" @click="toggleRightDrawer()" color="" label="Feed"/>
        <q-btn class="q-btn-w80 text-black" icon="timer" @click="toggleRightDrawer()" color="" label="Descobrir"/>
        <q-btn class="q-btn-w80 text-black" icon="timer" @click="toggleRightDrawer()" color="" label="Configurações"/>
        <q-btn class="q-btn-w80 text-black" icon="timer" @click="toggleRightDrawer()" color="" label="Favoritos"/>
        <q-btn class="q-btn-w80 text-black" icon="timer" @click="toggleRightDrawer()" color="" label="Fazer Logout"/>
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

const isLogin = ref(false)
const rightDrawerOpen = ref(false)

function toggleLogin () {
  isLogin.value = !isLogin.value  
}

function toggleRightDrawer () {
  rightDrawerOpen.value = !rightDrawerOpen.value
}
</script>
<style scoped>
.q-btn-w80{
  width: 80%;
}
</style>
