<template>
    <div class="relative">
        <div class="modal-view animate__animated animate__fadeInLeft q-pb-xl">
            <section class="w100 text-white text-center text-bold q-pb-xl" style="position:relative">
                <div class="w100 header-musica row justify-center">
                    <q-btn style="height:100%" @click="closeViewMusica()" flat icon="chevron_left" icon-right="library_music" size="md" class="mid-opacity absolute-top-left" color="grey-3" />
                    <div style="width: 60vw;" class="text-h6 font-decorative-2 text-bold q-my-md text-grey-4 w80">{{musica.nome.toUpperCase()}}</div>
                    <q-btn style="height:100%" @click="abrirConfirmModal('musica', null)" flat icon="delete" size="md" class="absolute-top-right" color="red-6" />
                </div>
                <div class="row items-center justify-between q-pl-md no-wrap q-pb-sm" style="border-bottom: 1px solid grey;padding-top:.5rem">
                    <q-btn @click="goTo(musica.link_audio)" dense icon="play_circle" label="ouvir" class="text-purple-6" flat/>
                    <span class="text-purple-6">{{musica.genero.trim()=='' ? 'Gênero': musica.genero}}</span>
                    <div class="font-decorative-3 text-purple-6 text-center q-pr-lg">{{musica.criadoPor}}<q-icon name="person" size="sm" class="q-pl-sm q-pb-xs"/></div>
                </div>
                <div id="link-musica" class="column items-center justify-evenly animate__animated animate__lightSpeedInRight animate__slow" v-for="(link_musica, index) in musica.links_musica" :key="index" >
                    <span class="w100 text-bold text-center mid-opacity q-pt-xs q-pb-sm" style="border-bottom: 1px solid grey;">{{  link_musica.titulo }}</span>
                    <div class="w100 no-wrap row items-center justify-evenly text-center q-mt-sm">
                        <q-btn dense icon="close" size="sm" class="text-grey-7" @click="abrirConfirmModal('link', link_musica)" label="remover" flat/>
                        <q-btn size="sm" v-if="link_musica.link.includes('https://')"  @click="goTo(link_musica.link)" dense icon-right="link" :label="'abrir '" class="text-bold text-blue-7 " flat/>
                        <q-btn dense icon="visibility" size="sm" @click="abrirLinkMusica(link_musica)" label="visualizar" class="text-green-6" flat/>
                    </div>
                </div>
                </section>
                </div>
                    <div id="actions" class="w100 row no-wrap q-pl-md q-gutter-x-md">
                        <q-btn class=" rounded-borders"  icon="add_circle" color="green" size="xl"/>
                    </div>
                    <q-dialog v-model="confirm" persistent>
                        <q-card>
                          <q-card-section class="row items-center">
                            <q-avatar icon="delete" color="red" text-color="white" />
                            <span class="q-ml-sm q-mt-md">{{ handleDelete.msg }}</span>
                          </q-card-section>
                  
                          <q-card-actions align="right">
                            <q-btn flat label="Cancelar" color="primary" v-close-popup />
                            <q-btn dense @click="handleDelete.isMusica ? removerMusica() : removerLink()" label="Confirmar" color="red" v-close-popup />
                          </q-card-actions>
                        </q-card>
                      </q-dialog>
                      <q-dialog v-model="alert">
                        <q-card>
                          <q-card-section>
                            <div class="text-h6">{{ alertMsg.titulo }}</div>
                          </q-card-section>
                  
                          <q-card-section class="q-pt-none">
                            {{ alertMsg.msg }}
                          </q-card-section>
                  
                          <q-card-actions align="right">
                            <q-btn flat label="OK" color="primary" v-close-popup />
                          </q-card-actions>
                        </q-card>
                      </q-dialog>
                  
                </div>
</template>
<script setup lang="ts">
import { api } from 'src/boot/axios';
import { useSettingsStore } from 'src/stores/settingsStore';
import { onBeforeMount, defineEmits, ref } from 'vue';
import { useAuthStore } from 'src/stores/authStore';
import { useQuasar } from 'quasar';

const alert = ref(false)
const $q = useQuasar()
const authStore = useAuthStore();
const settingsStore = useSettingsStore();
const musica = ref() as any;    
const confirm = ref(false)
const handleDelete = ref({
    isMusica: false,
    msg: 'Deseja remover o item selecionado?',
    id: ''
}) as any

const abrirConfirmModal = (modal: string, linkOrMusica: any) => {
    switch (modal) {
        case 'link':
            handleDelete.value.id = linkOrMusica._id
            handleDelete.value.msg = `Deseja remover o item ${linkOrMusica.titulo} selecionado?`
            handleDelete.value.isMusica = false
            confirm.value = true
            break
        case 'musica':
            handleDelete.value.id = musica.value._id
            handleDelete.value.msg = `Deseja remover a música ${musica.value.nome} selecionada?`
            handleDelete.value.isMusica = true
            confirm.value = true
            break
    }
}

async function removerLink() {
    const reqObject = {
    login: authStore.getInfoLogin(),
    senha: authStore.getInfoPassword(),
    linksIds: [handleDelete.value.id],
    musicaId: musica.value._id
  }
  await api.delete('/remover-links', { data: reqObject })
    .then((res) => {
      $q.notify({
            message: res.data.message,
            color: 'green-6',
            position: 'top',
            icon: 'delete_forever'
        })
        buscarMusica()
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

async function removerMusica() {
    const reqObject = {
    login: authStore.getInfoLogin(),
    senha: authStore.getInfoPassword(),
    musicaId: musica.value._id
  }
  await api.delete('/remover-musica', { data: reqObject })
    .then((res) => {
      $q.notify({
            message: res.data.message,
            color: 'green-6',
            position: 'top',
            icon: 'delete_forever'
        })
        closeViewMusica()
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

const emit = defineEmits(['closeViewMusica'])

function goTo(link: string) {
    window.open(link, '_blank')
}

function closeViewMusica() {
    emit('closeViewMusica')
}

const alertMsg = ref({
    titulo: '',
    msg: ''
})
function abrirLinkMusica(link_musica: any) {
    alert.value = true
    alertMsg.value.titulo = link_musica.titulo
    alertMsg.value.msg = link_musica.link
}
async function buscarMusica() {
    await api.post('/musica', { _id: settingsStore.getSongViewHandle() })
    .then((response) => {
        musica.value = response.data.musica
    })
}
onBeforeMount(async () => {
    await buscarMusica()
})
</script>
<style scoped>
.header-musica {
    position: sticky;
    top:0rem;
    background: #000000;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to bottom, #1e1e1e, #101010);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to bottom, #1e1e1e, #101010); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    z-index: 999;
    border-bottom: 1px solid #8e8e8e;
}
.modal-view {
    background-color: #000000c8;
    backdrop-filter: blur(10px);
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 3rem;
    left: 0;
    z-index: 1000;
    overflow-y: auto;
}
#link-musica {
    background-color: #0000004e;
    backdrop-filter: blur(5px);
    padding: 10px;
    margin: 10px;
    border-radius: 10px;
    border-bottom: 1px double #8e8e8e;
    border-top: 1px double #8e8e8e;
}
#actions {
    position: fixed;
    bottom: 1rem;
    z-index: 1000;
    opacity: .7;
    transition: all 0.3s ease;
  }
</style>