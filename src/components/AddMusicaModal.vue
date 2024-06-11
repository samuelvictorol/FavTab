<template>
    <div class="modal animate__animated animate__fadeIn animate__slow">
        <div class="modal-content q-px-md q-pb-sm">
            <div class="q-pt-xs text-h5 font-decorative-2 row no-wrap items-center">
                Adicionar Música
                <q-btn @click="help()" size="lg" color="" icon="help" flat/>
            </div>
            <div class="column">
                <div v-if="step == 1" id="step-1" class="column q-gutter-y-md">
                    <q-input color="grey-8" v-model="addMusicaObject.nome" maxlength="40" label="Nome*" outlined />
                    <q-input color="grey-8" dense maxlength="200" v-model="addMusicaObject.link_audio" label="Link do Áudio" outlined>
                        <template v-slot:append>
                            <q-icon name="play_circle" color="grey-8"/>
                        </template>
                    </q-input>
                </div>
                <div v-if="step == 2" id="step-2" class="column q-gutter-y-md ">
                    <div class="">
                        <q-icon size="sm" :color="isLetra ? 'orange' : 'grey-6'" class="q-mr-sm" name="lyrics"/>
                        <q-toggle color="orange-6" v-model="isLetra" class="text-black" left-label label="Irá vincular uma letra/anotação?" />
                    </div>
                    <q-input dense maxlength="40" v-model="tituloHandle" :label=" !isLetra ? 'Título do Link' : 'Título da Letra/Anotação'" :color="isLetra ? 'orange' : 'grey-6'" outlined />
                    <q-input v-model="linkHandle" v-if="!isLetra && tituloHandle.trim() != ''" class="animate__animated animate__fadeInDown" color="grey-6" dense maxlength="200" :label="'Link ' + tituloHandle + '*'" outlined>
                        <template v-slot:append>
                            <q-icon name="link" color="grey-8"/>
                        </template>
                    </q-input>
                    <q-input type="textarea" v-if="isLetra && tituloHandle.trim() != ''" dense maxlength="400" class="animate__animated animate__fadeInDown" 
                        v-model="linkHandle" :filled="tituloHandle.trim() == ''" :disable="tituloHandle.trim() == ''" label="Letra*" color="orange" outlined>
                        <template v-slot:append>
                            <q-icon name="lyrics" color="orange"/>
                        </template>
                    </q-input>
                    <q-btn dense v-if="tituloHandle.trim() != ''" :icon="isLetra ? 'lyrics': 'link'" :color="isLetra ? 'orange': 'grey-8'" :disable="tituloHandle.trim() == '' || linkHandle.trim() == ''" :label="'Adicionar ' + (isLetra ? 'Letra' : 'Link')" @click="addLink()"/>
                    <div v-if="tituloHandle.trim() != ''" class="line low-opacity"></div>
                    <div id="links" style="max-height: 100px; overflow-y: auto;">
                        <ul class="reset-margin reset-padding">
                            <li v-for="(cifra, index) in addMusicaObject.links_musica" :key="index" style="border:2px solid #6b6b6b;" class="q-pa-xs q-mb-sm row items-center justify-between">
                                <div class="row items-center">
                                    <q-icon size="sm" :color=" !cifra.link.includes('https') ? 'orange': 'grey-8'" name="lyrics"/>
                                </div>
                                <div class="q-ml-md"><a target="_blank" :href="cifra.link.includes('https') ? cifra.link : showLetra(cifra.link)">{{ cifra.titulo }}</a></div>
                                <div class="row items-center">
                                    <q-icon size="md" color="red-7" name="remove" @click="removeLink(index)"/>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <q-btn v-if="step == 1" color="blue-6" label="Próximo" class="q-mt-md" icon-right="skip_next" :disable="addMusicaObject.nome.trim() == ''" @click="sumStep(1)"/>
                <q-btn v-if="step == 2" color="green" icon="library_add" :label="'Salvar ' + addMusicaObject.nome" @click="salvar()"/>
                <q-btn flat class="text-grey-8" label="voltar" @click="voltar()"/>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, defineEmits, onBeforeMount } from "vue";
import { AddMusicaObject } from "./models";

const isLetra = ref<boolean>(false)
const emit = defineEmits(['toggleAddMusicaModal', 'salvarMusicas'])
const step = ref<number>(1)
const tituloHandle = ref<string>('')
const linkHandle = ref<string>('')
import { useAuthStore } from 'src/stores/authStore';

const authStore = useAuthStore();

const addMusicaObject = ref<AddMusicaObject>({
    nome: '',
    link_audio: '',
    genero: '',
    links_musica: [],
    criadoPor: ''
})

function voltar() {
    if (step.value == 1) {
        emit('toggleAddMusicaModal')
        return
    } else {
        step.value -= 1
    }
}

const help = () => {
    alert(`* LINKS DEVEM TER 'HTTPS' EM SEU INÍCIO *\n\n1 🎼🎶\n- Crie uma música, adicione o link do áudio caso exista.\n\n2 🎷🎸🎺🎻🪕🎹🎙️🎼\n- Vincule múltiplos Links relacionados à música como: backing track, letras, partituras, cifras e tablaturas.
    \n- Ou anote estrofes de letras ou pensamentos (como anotações de letras autorais, anotações como especificações de pedais e parâmetros.`)
}

function sumStep(value: number) {
    step.value += value
}

function showLetra(link: string) {
    return `https://www.google.com/search?q=${link}`
}

function addLink() {
    addMusicaObject.value.links_musica.unshift({
        titulo: tituloHandle.value,
        link: linkHandle.value
    });
    tituloHandle.value = '';
    linkHandle.value = '';
}


function removeLink(index: number) {
    addMusicaObject.value.links_musica.splice(index, 1)
}

function salvar() {
    emit('salvarMusicas', addMusicaObject.value)
    emit('toggleAddMusicaModal')
}

onBeforeMount(() => {
    addMusicaObject.value.criadoPor = authStore.getInfoLogin()
})
</script>
<style scoped>
.modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    border: 1px solid #888;
    width: 95%;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
}

li {
    border-radius: 6px;
}

a {
    color: #000;
    text-decoration: none;
    font-weight: 500;
}
</style>