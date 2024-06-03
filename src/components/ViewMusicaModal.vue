<template>
    <div class="modal-view animate__animated animate__fadeInLeft">
        <section class="w100 text-white text-center text-bold">
            <div class="w100 header-musica row justify-center">
                <q-btn @click="closeViewMusica()" flat icon="keyboard_return" size="md" class="absolute-top-left q-mt-md" color="grey-4" />
                <div class="text-h5 font-decorative-2 q-my-md mid-opacity text-white text-center q-pr-lg">{{musica.nome}}</div>
            </div>
            <div class="row items-center justify-between q-pl-md" style="padding-top:4.5rem">
                <q-btn @click="goTo(musica.link_audio)" dense icon="play_circle" label="ouvir" class="text-red-7" flat/>
                <span class="mid-opacity">{{musica.genero}}jazz</span>
                <div class="font-decorative-3 text-yellow-2 text-center q-pr-lg"><i>by: {{musica.criadoPor}}</i></div>
            </div>
            <div id="link-musica" class="row items-center justify-evenly animate__animated animate__lightSpeedInRight animate__slow" v-for="(link_musica, index) in musica.links_musica" :key="index" >
                <span class="text-bold q-px-sm">{{  link_musica.titulo }}</span>
                <q-btn v-if="link_musica.link.includes('https://')"  @click="goTo(link_musica.link)" dense icon="link" :label="'abrir '" class="text-blue-7 " flat/>
                <div class="row items-center justify-center text-center q-pl-sm">
                    <q-btn dense icon-right="remove" class="text-red-7 " flat/>
                    <q-btn dense icon="visibility" @click="abrirLinkMusica(link_musica)" class="text-green-4" flat/>
                </div>
            </div>
        </section>

    </div>
</template>
<script setup lang="ts">
import { api } from 'src/boot/axios';
import { useSettingsStore } from 'src/stores/settingsStore';
import { onBeforeMount, defineEmits, ref } from 'vue';
const settingsStore = useSettingsStore();
const musica = ref() as any;
const emit = defineEmits(['closeViewMusica'])

function goTo(link: string) {
    window.open(link, '_blank')
}

function closeViewMusica() {
    emit('closeViewMusica')
}

function abrirLinkMusica(link_musica: any) {
    alert(link_musica.titulo + '\n' + link_musica.link)
}

onBeforeMount(async () => {
    await api.post('/musica', { _id: settingsStore.getSongViewHandle() })
    .then((response) => {
        musica.value = response.data.musica
        console.log(JSON.stringify(musica.value))
    })
})
</script>
<style scoped>
.header-musica {
    position: fixed;
    background: #000000;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to bottom, #1e1e1e, #101010);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to bottom, #1e1e1e, #101010); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    z-index: 99;
    border-bottom: 1px solid #8e8e8e;
}
.modal-view {
    background-color: #000000c8;
    backdrop-filter: blur(8px);
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
}
</style>