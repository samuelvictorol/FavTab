<template>
  <q-page class="relative q-pb-xl" v-if="loaded">
    <div id="repertorio-name" class="q-py-sm row items-center justify-center">
      <q-btn @click="router.push('/profile')" flat icon="keyboard_return" size="md" class="absolute-left" color="grey-6" />
      <div  class="text-h6 text-bold  font-decorative-2 q-py-xs text-white text-center">{{repertorio.nome.toUpperCase()}}</div>
      <q-btn @click="confirm = true" flat icon="delete_forever" size="md" class="absolute-right" color="red-8" />
    </div>
    <div class="w100 row justify-center">
      <div class=" w80 text-white text-center mid-opacity q-pt-sm text-bold">
        {{ repertorio.descricao }}
      </div>
    </div>
    <div class="status-repertorio row w100 no-wrap q-mt-xs items-center justify-center">
      <q-chip class="shadow-3 text-white" :label="repertorio.musicas.length + ' músicas'" icon="library_music" color="orange-6" />
      <q-chip class="shadow-3 text-white" :label="repertorio.criadoPor" icon="person" color="blue-6" />
      <q-chip class="shadow-3 text-white" :label="repertorio.curtidas + ' likes'" icon="favorite" color="red-6" />
    </div>
    <div class="w100 q-mt-sm" style="border-top: 1px solid #4d4d4d">
      <div class="font-decorative-2 text-h6 text-bold text-white q-pl-sm mid-opacity q-py-sm">
        &#127900; Minhas Músicas
      </div>
      <div v-for="(musica, index) in repertorio.musicas" :key="index" class="animate__animated  animate__slideInLeft animate__slow q-mt-sm q-mx-sm musicas rounded-borders column bg-black-ui text-white q-pa-md items-center justify-between">
        <div style="width:80%" class="text-center">{{musica.nome.toUpperCase()}}</div>
        <div class="w100 q-pt-sm row no-wrap justify-around">
          <q-btn dense @click="navigateTo(musica.link_audio)" label="remover" icon="close" class="text-red-7" flat/>
          <q-btn dense @click="navigateTo(musica.link_audio)" label="ouvir" icon="play_circle" class="text-purple-7" flat/>
          <q-btn dense @click="viewMusica(musica._id)" label="abrir" icon="library_music" class="text-orange-6" flat/>
        </div>
      </div>

    </div>
    <div class="w100 q-py-lg"></div>
    <div id="actions" class="w100 row no-wrap q-pl-md q-gutter-x-md">
      <q-btn class=" rounded-borders"  icon="add_circle" color="green" size="xl"/>
      <!-- <q-btn class=" rounded-borders"  icon="favorite" color="red" size="xl"/> -->
    </div>
    <ViewMusicaModal  v-if="viewMusicaModal" @closeViewMusica="closeViewMusica()"/>
  </q-page>
  <q-page v-if="!loaded" class="w100 column justify-center items-center">
    <q-spinner-pie color="black" size="xl"/>
  </q-page>
  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="delete" color="red" text-color="white" />
        <span class="q-ml-sm q-mt-md">Tem certeza que deseja remover permanentemente o repertório {{ repertorio.nome }} ?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="primary" v-close-popup />
        <q-btn dense @click="removerRepertorio()" label="Confirmar" color="red" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { api } from "src/boot/axios";
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from 'src/stores/authStore';
import { useSettingsStore } from 'src/stores/settingsStore';
import ViewMusicaModal from "src/components/ViewMusicaModal.vue";
import { useQuasar } from "quasar";

const $q = useQuasar()
const confirm = ref(false)
const authStore = useAuthStore();
const settingsStore = useSettingsStore();
const router = useRouter()
const repertorio = ref({
  _id: '',
  nome:'',
  descricao:'',
  musicas: [],
}) as any;

const viewMusicaModal = ref(false);

const loaded = ref(false);
async function removerRepertorio() {
  const reqObject = {
    login: authStore.getInfoLogin(),
    senha: authStore.getInfoPassword(),
    idsRepertoriosArray: [repertorio.value._id]
  }
  await api.delete('/repertorios', { data: reqObject })
    .then((res) => {
      $q.notify({
            message: res.data.message,
            color: 'green-6',
            position: 'top',
            icon: 'delete_forever'
        })
      router.push('/profile')
    })
    .catch((error) => {
      $q.notify({
            message: error.response.data.message,
            color: 'red-8',
            position: 'top',
            icon: 'error'
        })
    });
}

onBeforeMount(async () => {
  await api.post("/repertorios", { _id: settingsStore.getRepertorioViewHandle() ,login: authStore.getInfoLogin(), senha: authStore.getInfoPassword()})
  .then((response) => {
    repertorio.value = response.data.repertorio
    loaded.value = true
  })
  .catch((error) => {
    console.log(error)
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
  background: linear-gradient(to bottom, #414345, #000000); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  
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
  border-top: 2px double #4d4d4d;
  border-bottom: 2px double #4d4d4d;
  filter: drop-shadow(0px 2px 3px #000);
  background: #000000d4;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #656565, #363636);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #212121, #0f0f0f); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

</style>