<template>
    <div class="modal animate__animated animate__fadeIn animate__slow">
        <div class="modal-content">
            <div class="text-h5 font-decorative-2 q-mt-sm">Adicionar Música</div>
            <div class="column q-gutter-y-md q-mt-sm">
                <div v-if="step == 1" id="step-1" class="column q-gutter-y-md q-mt-sm">
                    <q-input color="grey-8" v-model="addMusicaObject.nome" label="Nome*" outlined />
                    <q-input type="textarea" dense color="grey-8" v-model="addMusicaObject.descricao" label="Descrição" outlined />
                    <q-select color="grey-8" v-model="addMusicaObject.genero" :options="generoOptions" label="Gênero" outlined />
                    <q-input color="grey-8" dense maxlength="200" v-model="addMusicaObject.linkAudio" label="Link do Áudio" outlined />
                </div>
                <div v-if="step == 2" id="step-2" class="column q-gutter-y-md ">
                    <div class="text-h6 mid-opacity">Cifras</div>
                    <q-input dense maxlength="25" v-model="tituloHandle" label="Título" color="grey-8" outlined />
                    <q-input @keypress.enter="addLink()" dense maxlength="200" v-model="linkHandle" :filled="tituloHandle.trim() == ''" :disable="tituloHandle.trim() == ''" label="Link*" color="grey-8" outlined />
                    <q-btn dense color="orange-6" :disable="tituloHandle.trim() == '' || linkHandle.trim() == ''" label="Adicionar link" @click="addLink()"/>
                    <div class="line low-opacity"></div>
                    <div id="links" style="max-height: 100px; overflow-y: auto;">
                        <ul class="reset-margin reset-padding">
                            <li v-for="(cifra, index) in addMusicaObject.cifras" :key="index" class="row items-center justify-between">
                                <div class="row items-center">
                                    <q-icon size="sm" color="blue-7" name="music_note"/>
                                    <q-icon v-if="index == 0" size="sm" color="red-7" name="favorite"/>
                                </div>
                                <div class="q-ml-md"><a target="_blank" :href="cifra.link">{{ cifra.titulo }}</a></div>
                                <div class="row items-center">
                                    <q-icon size="md" color="red-7" name="remove" @click="removeLink(index)"/>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <q-btn v-if="step == 1" color="blue-6" label="Próximo" :disable="addMusicaObject.nome.trim() == ''" @click="step += 1"/>
                <q-btn v-if="step == 2" color="green-6" label="Salvar Música" @click="salvar()"/>
                <q-btn flat class="text-grey-8" label="voltar" @click="voltar()"/>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { AddMusicaObject } from "./models";

const emit = defineEmits(['toggleAddMusicaModal', 'salvarMusicas'])
const step = ref<number>(1)
const tituloHandle = ref<string>('')
const linkHandle = ref<string>('')

const generoOptions = ['Rock', 'Pop', 'Sertanejo', 'Funk', 'Samba', 'Pagode', 'Forró', 'MPB', 'Gospel', 'Clássico', 'Jazz', 'Blues', 'Eletrônica', 'Reggae', 'Rap', 'Hip Hop', 'Metal', 'Country', 'Folk', 'Indie', 'Alternativo', 'Outro']
const addMusicaObject = ref<AddMusicaObject>({
    nome: '',
    descricao: '',
    linkAudio: '',
    genero: '',
    cifras: [],
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
    addMusicaObject.value.cifras.push({
        titulo: tituloHandle.value,
        link: linkHandle.value
    })
    tituloHandle.value = ''
    linkHandle.value = ''
}

function removeLink(index: number) {
    addMusicaObject.value.cifras.splice(index, 1)
}

function salvar() {
    emit('salvarMusicas', addMusicaObject.value)
    emit('toggleAddMusicaModal')
}

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

li:first-child {
    background-color: #beffdc;
}
</style>