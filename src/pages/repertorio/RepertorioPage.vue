<template>
  <q-page class="relative q-pb-xl">
    <div id="repertorio-name" class="q-py-xs row items-center justify-center">
      <q-btn @click="router.push('/profile')" flat icon="keyboard_return" size="md" class="absolute-left" color="grey-6" />
      <div class="text-h5 font-decorative-2 q-pt-sm q-pb-xs text-white text-center">{{repertorio.nome}}</div>
    </div>
    <section class="w100 text-white text-center mid-opacity text-bold">
      {{ repertorio.descricao }}
    </section>
    <div class="status-repertorio row w100 no-wrap q-mt-xs items-center justify-center">
      <q-chip class="bg-black-ui text-white" :label="repertorio.musicas.length + ' músicas'" icon="library_music" color="orange-6" />
      <q-chip class="bg-black-ui text-white" :label="repertorio.criadoPor" icon="person" color="blue-6" />
      <q-chip class="bg-black-ui text-white" :label="repertorio.curtidas + ' likes'" icon="favorite" color="red-6" />
    </div>
    <div class="w100 animate__animated animate__slideInUp animate__slower">
      <div v-for="(musica, index) in repertorio.musicas" :key="index" class="q-mt-sm q-mx-sm musicas rounded-borders row no-wrap bg-black-ui text-white q-pa-md items-center justify-between">
        <q-icon name="play_circle" color="black" size="md"/>
        <div style="width:80%" class="text-center">{{musica.nome}}</div>
        <q-icon name="visibility" color="blue-2" size="sm"/>
      </div>

    </div>
    <div class="w100 q-py-lg"></div>
    <div id="actions" class="w100 row no-wrap q-pl-md q-gutter-x-md">
      <q-btn class=" rounded-borders"  icon="add_circle" color="green" size="xl"/>
      <!-- <q-btn class=" rounded-borders"  icon="favorite" color="red" size="xl"/> -->
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { api } from "src/boot/axios";
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from 'src/stores/authStore';
import { useSettingsStore } from 'src/stores/settingsStore';

const authStore = useAuthStore();
const settingsStore = useSettingsStore();
const router = useRouter()
const repertorio = ref({
  nome:'',
  descricao:'',
  musicas: [],
}) as any;

onBeforeMount(async () => {
  await api.post("/repertorios", { _id: settingsStore.getRepertorioViewHandle() ,login: authStore.getInfoLogin(), senha: authStore.getInfoPassword()})
  .then((response) => {
    repertorio.value = response.data.repertorio
  })
})

</script>

<style scoped>
.q-page {
  background: #000000;
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
  background: #000000d4;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #2f2d2d, #000000);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #0a21a4, #3a219c); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

</style>