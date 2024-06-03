<template>
    <div class="modal animate__animated animate__fadeIn animate__slow">
        <div class="modal-content">
            <div class="text-h5 font-decorative-2 q-mt-sm">Adicionar Música</div>
            <div class="column q-gutter-y-md q-mt-sm">
                <div v-if="step == 1" id="step-1" class="column q-gutter-y-md q-mt-sm">
                    <q-input color="grey-8" v-model="addMusicaObject.nome" label="Nome*" outlined />
                    <q-input color="grey-8" dense maxlength="200" v-model="addMusicaObject.link_audio" label="Link do Áudio" outlined>
                        <template v-slot:append>
                            <q-icon name="play_circle" color="grey-8"/>
                        </template>
                    </q-input>
                </div>
                <div v-if="step == 2" id="step-2" class="column q-gutter-y-md ">
                    <div class="text-h7 mid-opacity">Vincule links as suas músicas <q-icon id="help-btn" size="sm" name="help"/></div>
                    <q-input dense maxlength="50" v-model="tituloHandle" label="Título do link/letra" color="grey-8" outlined />
                    <q-input type="textarea" v-if="tituloHandle.trim() != ''"  @keypress.enter="addLink()" dense maxlength="400" class="animate__animated animate__fadeInDown" v-model="linkHandle" :filled="tituloHandle.trim() == ''" :disable="tituloHandle.trim() == ''" label="Link/Letra*" color="grey-8" outlined />
                    <q-btn icon="lyrics" color="blue-6" :disable="tituloHandle.trim() == '' || linkHandle.trim() == ''" label="Adicionar link" @click="addLink()"/>
                    <div class="line low-opacity"></div>
                    <div id="links" style="max-height: 100px; overflow-y: auto;">
                        <ul class="reset-margin reset-padding">
                            <li v-for="(cifra, index) in addMusicaObject.links_musica" :key="index" style="border:2px solid #6b6b6b;" class="q-pa-xs q-mb-sm row items-center justify-between">
                                <div class="row items-center">
                                    <q-icon size="sm" color="blue-7" name="lyrics"/>
                                </div>
                                <div class="q-ml-md"><a target="_blank" :href="cifra.link">{{ cifra.titulo }}</a></div>
                                <div class="row items-center">
                                    <q-icon size="md" color="red-7" name="remove" @click="removeLink(index)"/>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <q-btn v-if="step == 1" color="blue-6" label="Próximo" icon-right="skip_next" :disable="addMusicaObject.nome.trim() == ''" @click="step += 1"/>
                <q-btn v-if="step == 2" color="grey-9" icon="music_note" label="Salvar Música" @click="salvar()"/>
                <q-btn flat class="text-grey-8" label="voltar" @click="voltar()"/>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, defineEmits, onBeforeMount } from "vue";
import { AddMusicaObject } from "./models";

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

function addLink() {
    addMusicaObject.value.links_musica.push({
        titulo: tituloHandle.value,
        link: linkHandle.value
    })
    tituloHandle.value = ''
    linkHandle.value = ''
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
    padding: 20px;
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