<template>
    <div class="modal animate__animated animate__fadeIn animate__slow">
        <div class="modal-content">
            <div class="nova-musica ">
                <div class="q-pa-md w100 column q-gutter-y-md">
                    <div v-if="!addItems" class="text-h6 text-grey-4 bg-black rounded-borders text-center ">🎼 Repertório {{ props.repertorioResume.nome }}</div>
                    <div v-if="addItems" class="text-h6 text-white bg-purple q-px-xs rounded-borders text-center">🔗🗒️ Adicionando Items em {{ addMusicaObject.nome }}</div>
                    <q-input style="width: 100vw;" maxlength="40" v-if="!addItems" class=" bg-white rounded-borders" color="grey-8" v-model="addMusicaObject.nome" label="Nome da Música*" outlined />
                    <q-input  v-if="!addItems" class="bg-white rounded-borders" color="grey-8" dense maxlength="200" v-model="addMusicaObject.link_audio" label="Link do Áudio" outlined>
                        <template v-slot:append>
                            <q-icon  @click="openYt()"  name="play_circle" color="red-7"/>
                        </template>
                    </q-input>
                    <div v-if="addItems" class="w100 row justify-center items-center">
                        <q-icon size="sm" :color="isLetra ? 'orange' : 'grey-6'" class="q-mr-sm" :name="isLetra ? 'lyrics' : 'link'"/>
                        <q-toggle color="orange-6" v-model="isLetra" :class="isLetra ? 'text-orange' : 'text-white'" left-label :label=" !isLetra ? 'Link' : 'Anotação'" />
                    </div>
                    <q-input v-if="addItems" v-model="linkMusicaHandle.titulo" class="bg-grey-2 rounded-borders" :color="isLetra ? 'orange' : 'grey-8'" dense maxlength="40" 
                        :label="'Título ' + (isLetra ? 'Anotação' : 'Link') + '*'" outlined />
                    <q-input type="textarea" v-if="isLetra && addItems  " v-model="linkMusicaHandle.link" class="bg-grey-2 rounded-borders animate__animated animate__fadeInDown" color="orange" dense maxlength="200" 
                        :label="(isLetra ? 'Anotação' : 'Link' ) + '*'" outlined>
                        <template v-slot:append>
                            <q-icon :name="isLetra ? 'lyrics' : 'link'" :color="isLetra ? 'orange' : 'grey-8'"/>
                        </template>
                    </q-input>
                    <q-input v-if="!isLetra && addItems" v-model="linkMusicaHandle.link" class="bg-grey-2 rounded-borders animate__animated animate__fadeInDown" color="black" dense maxlength="200" 
                        :label="(isLetra ? 'Anotação' : 'Link' ) + '*'" placeholder="Inclua https:// no início do link" outlined>
                        <template v-slot:append>
                            <q-icon :name="isLetra ? 'lyrics' : 'link'" :color="isLetra ? 'orange' : 'grey-8'"/>
                        </template>
                    </q-input>
                    <q-btn v-if="!addItems" :disable="addMusicaObject.nome.trim() == ''" @click="addItems = !addItems" label="Adicionar items" icon="lyrics" color="purple" />
                    <q-btn v-if="addItems" :disable="linkMusicaHandle.titulo.trim() == '' || linkMusicaHandle.link.trim() == ''" @click="addMusica()" label="Adicionar Item" icon="add"  color="purple" />
                    <div class="text-grey-4 text-center">{{ addMusicaObject.links_musica.length }} item(s) adicionado(s)</div>
                    <div id="links" style="max-height: 100px; overflow-y: auto;">
                        <ul class=" reset-margin reset-padding">
                            <li v-for="(cifra, index) in addMusicaObject.links_musica" :key="index" style="border:2px solid #6b6b6b;" class="rounded-borders q-pa-xs q-mb-sm row items-center justify-between">
                                <div class="row items-center">
                                    <q-icon size="sm" :color="!cifra.link.includes('https') ? 'orange': 'grey-8'" :name=" !cifra.link.includes('https') ? 'lyrics': 'link'"/>
                                </div>
                                <div class="q-ml-md"><a target="_blank" @click="previewItem(cifra)" :class="cifra.link.includes('https') ? 'text-grey-8' : 'text-orange'">{{ cifra.titulo }}</a></div>
                                <div class="row items-center">
                                    <q-icon size="md" color="red-7" name="remove" @click="removeLink(index)"/>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <q-btn v-if="addItems" @click="addItems = !addItems" flat dense :label="addMusicaObject.links_musica.length > 0 ? 'continuar' : 'voltar'" color="blue" />
                    <q-btn :disable="addMusicaObject.nome.trim() == ''" v-if="!addItems" @click="salvarMusica()" label="Salvar Música" icon="library_music"  color="green" />
                    <q-btn v-if="!addItems" label="cancelar" color="white" flat @click="$emit('closeAddMusicaLinkAvulsoModal')" />
                </div>
            </div>
        </div>
        
    </div>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'
import { AddMusicaObject } from './models'
import { useAuthStore } from 'src/stores/authStore';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';

const $q = useQuasar()
const emit = defineEmits(['closeAddMusicaLinkAvulsoModal', 'atualizaRepertorio'])
const onlyNewLinks = ref(false)
const addItems = ref(false)
const isLetra = ref(false)
const authStore = useAuthStore();
const props = defineProps<{
    repertorioResume: any
    musicaResume: any
}>()

const addMusicaObject = ref<AddMusicaObject>({
    nome: '',
    link_audio: '',
    links_musica: [],
    criadoPor: authStore.getInfoLogin(),
})

const linkMusicaHandle = ref({
    titulo: '',
    link: ''
})

async function salvarMusica() {
    await api.post('/nova-musica', {
        repertorioId: props.repertorioResume._id,
        musica: addMusicaObject.value,
        login: authStore.getInfoLogin(),
        senha: authStore.getInfoPassword()
    }).then((res) => {
        $q.notify({
            message: res.data.message,
            color: 'green-7',
            position: 'top',
            icon: 'library_music'
        })
        emit('atualizaRepertorio')
        emit('closeAddMusicaLinkAvulsoModal')
    }).catch((err) => {
        $q.notify({
            message: err.response.data.message,
            color: 'red-7',
            position: 'top',
            icon: 'error'
        })
    })
}

function addMusica() {
    addMusicaObject.value.links_musica.push({
        titulo: linkMusicaHandle.value.titulo,
        link: linkMusicaHandle.value.link
    })
    resetLinkMusicaHandle()
}

const resetLinkMusicaHandle = () => {
    linkMusicaHandle.value = {
        titulo: '',
        link: ''
    }
}

function openYt() {
    window.open('https://www.youtube.com/' +  (addMusicaObject.value.nome.trim() == '' ? '' : ('results?search_query=' + formataNomeToQuery(addMusicaObject.value.nome))), '_blank')
}

function previewItem(cifra: any) {
    if(cifra.link.includes('https://')){
        window.open(cifra.link, '_blank')
        return
    } else {
        alert('Título: ' + cifra.titulo + '\nAnotação:' + cifra.link)
    }
}



function removeLink(index: number) {
    addMusicaObject.value.links_musica.splice(index, 1)
}


function formataNomeToQuery(nome: string) {
    return nome.split(' ').join('+')
}

</script>
<style scoped>

</style>