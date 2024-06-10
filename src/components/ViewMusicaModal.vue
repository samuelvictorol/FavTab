<template>
    <div class="relative">
        <div class="modal-view animate__animated animate__fadeInLeft q-pb-xl">
            <section class="w100 text-white text-center text-bold q-pb-xl" style="position:relative">
                <div class="w100 header-musica row justify-center">
                    <q-btn @click="closeViewMusica()" flat icon="chevron_left" icon-right="library_music" size="md" class="mid-opacity absolute-top-left q-mt-md" color="grey-3" />
                    <div class="text-h6 font-decorative-2 text-bold q-my-md text-grey-2 w80">{{musica.nome}}</div>
                    <q-btn @click="removerMusica(musica._id, musica.nome)" flat icon="delete_forever" size="md" class="absolute-top-right q-mt-md" color="red-8" />
                </div>
                <div class="row items-center justify-between q-pl-md no-wrap q-pb-sm" style="border-bottom: 1px solid grey;padding-top:.5rem">
                    <q-btn @click="goTo(musica.link_audio)" dense icon="play_circle" label="ouvir" class="text-purple-6" flat/>
                    <span class="text-purple-6">{{musica.genero.trim()=='' ? 'Gênero': musica.genero}}</span>
                    <div class="font-decorative-3 text-purple-6 text-center q-pr-lg">{{musica.criadoPor}}<q-icon name="person" size="sm" class="q-pl-sm q-pb-xs"/></div>
                </div>
                <div id="link-musica" class="column items-center justify-evenly animate__animated animate__lightSpeedInRight animate__slow" v-for="(link_musica, index) in musica.links_musica" :key="index" >
                    <span class="w100 text-bold text-center mid-opacity q-pt-xs q-pb-sm" style="border-bottom: 1px solid grey;">{{  link_musica.titulo }}</span>
                    <div class="w100 no-wrap row items-center justify-evenly text-center q-mt-sm">
                        <q-btn dense icon="close" size="sm" class="text-grey-7" @click="removerMusicaProperties(link_musica)" label="remover" flat/>
                        <q-btn size="sm" v-if="link_musica.link.includes('https://')"  @click="goTo(link_musica.link)" dense icon-right="link" :label="'abrir '" class="text-bold text-blue-7 " flat/>
                        <q-btn dense icon="visibility" size="sm" @click="abrirLinkMusica(link_musica)" label="visualizar" class="text-green-6" flat/>
                    </div>
                </div>
                </section>
                </div>
                    <div id="actions" class="w100 row no-wrap q-pl-md q-gutter-x-md">
                        <q-btn class=" rounded-borders"  icon="add_circle" color="green" size="xl"/>
                        <!-- <q-btn class=" rounded-borders"  icon="favorite" color="red" size="xl"/> -->
                    </div>
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

function removerMusicaProperties(link_musica: any) {
    confirm(`Deseja remover o item ${link_musica.titulo}\n de id ${link_musica._id} ?`)
}

function removerMusica(id: string, nome: string) {
    confirm(`Deseja remover a música ${nome} e todos items vinculados?`)
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