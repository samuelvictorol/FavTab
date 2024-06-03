<template>
  <q-page class="relative q-pb-xl">
    <div id="repertorio-name" class="q-py-xs row items-center justify-center">
      <q-btn @click="router.push('/profile')" flat icon="keyboard_return" size="md" class="absolute-left" color="grey-6" />
      <div class="text-h5 font-decorative-2 q-pt-sm q-pb-xs text-white text-center">{{repertorio.nome}}</div>
    </div>
    <section class="w100 text-white text-center mid-opacity q-pt-sm text-bold">
      {{ repertorio.descricao }}
    </section>
    <div class="status-repertorio row w100 no-wrap q-mt-xs items-center justify-center">
      <q-chip class="bg-black-ui text-white" :label="repertorio.musicas.length + ' músicas'" icon="library_music" color="orange-6" />
      <q-chip class="bg-black-ui text-white" :label="repertorio.criadoPor" icon="person" color="blue-6" />
      <q-chip class="bg-black-ui text-white" :label="repertorio.curtidas + ' likes'" icon="favorite" color="red-6" />
    </div>
    <div class="w100 animate__animated animate__slideInUp animate__slower">
      <div v-for="(musica, index) in repertorio.musicas" :key="index" class="q-mt-sm q-mx-sm musicas rounded-borders row no-wrap bg-black-ui text-white q-pa-md items-center justify-between">
        <q-btn @click="navigateTo(musica.link_audio)" icon="play_circle" class="text-red-7" flat/>
        <div style="width:80%" class="text-center">{{musica.nome}}</div>
        <q-btn @click="viewMusica(musica._id)" icon="visibility" class="text-green-4" flat/>
      </div>

    </div>
    <div class="w100 q-py-lg"></div>
    <div id="actions" class="w100 row no-wrap q-pl-md q-gutter-x-md">
      <q-btn class=" rounded-borders"  icon="add_circle" color="green" size="xl"/>
      <!-- <q-btn class=" rounded-borders"  icon="favorite" color="red" size="xl"/> -->
    </div>
    <ViewMusicaModal  v-if="viewMusicaModal" @closeViewMusica="closeViewMusica()"/>
  </q-page>
</template>

<script setup lang="ts">
import { api } from "src/boot/axios";
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from 'src/stores/authStore';
import { useSettingsStore } from 'src/stores/settingsStore';
import ViewMusicaModal from "src/components/ViewMusicaModal.vue";

const authStore = useAuthStore();
const settingsStore = useSettingsStore();
const router = useRouter()
const repertorio = ref({
  nome:'',
  descricao:'',
  musicas: [],
}) as any;
const viewMusicaModal = ref(false)

onBeforeMount(async () => {
  await api.post("/repertorios", { _id: settingsStore.getRepertorioViewHandle() ,login: authStore.getInfoLogin(), senha: authStore.getInfoPassword()})
  .then((response) => {
    repertorio.value = response.data.repertorio
  })
})

function navigateTo(route: string) {
  console.log(route)
  if (route.trim() == '') return
  window.open(route, '_blank'); 
}

function viewMusica(_id: string) {
  settingsStore.setSongViewHandle(_id)
  viewMusicaModal.value = true
}

function closeViewMusica() {
  viewMusicaModal.value = false
}

</script>

<style scoped>
.q-page {
  background: #232526;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #414345, #232526);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #414345, #232526); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  
}
#repertorio-name {
  position: sticky!important;
  top: 3.15rem;
  background: #000000a1;
  backdrop-filter: blur(3px);
  z-index: 100;
}
#actions {
  position: fixed;
  bottom: 1rem;
  opacity: .7;
  transition: all 0.3s ease;
}
#actions:hover {
  opacity: 1;
}
.bg-black-ui {
  filter: drop-shadow(0px 2px 3px #000);
  background: #000000d4;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to top, #656565, #363636);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to top, #212121, #0f0f0f); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

</style>