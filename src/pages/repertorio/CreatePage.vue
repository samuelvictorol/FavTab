<template>
<q-page class="page bg-grey-3 q-pa-lg column">
    <div class="text-h5 text-center q-mt-sm text-bold font-decorative-2">Novo Repertório &#127926;</div>
    <div class="column q-gutter-y-md q-mt-sm">
        <q-input maxlength="40" color="grey-9" v-model="novoRepertorio.nome" label="Nome*" outlined />
        <q-input type="textarea" maxlength="200" color="grey-9" v-model="novoRepertorio.descricao" label="Descrição" outlined />
        <q-select color="grey-9" v-model="novoRepertorio.genero" :options="generoOptions" label="Gênero" outlined />
        <div class="row items-center">
            <q-toggle color="blue-6" v-model="novoRepertorio.privado" label="Privado" />
            <q-icon size="sm" color="grey-6" class="q-ml-sm" name="lock"/>
        </div>
        <div class="line low-opacity q-mt-md"></div>
        <q-btn @click="toggleAddMusicaModal()" color="orange-7" dense icon="add" label="Adicionar Música" />
        <div class="musicas column justify-center items-center">
        <div class="text-h6 mid-opacity"  v-if="novoRepertorio.musicas.length != 0">Músicas Adicionadas</div>
        <div class="line low-opacity q-my-md"></div>
        <div class="text-h6 text-grey-6" v-if="novoRepertorio.musicas.length == 0">Nenhuma música adicionada &#128531;</div>
            <ul class="reset-margin reset-padding w100 ">
                <li v-for="(musica, index) in novoRepertorio.musicas" :key="index" class=" w100 row items-center justify-between">
                    <div class="row items-center">
                        <q-icon size="sm" color="blue-7" name="music_note"/>
                    </div>
                    <div class="q-ml-md">{{ musica.nome }}</div>
                    <div class="row items-center">
                        <q-icon size="md" color="red-7" name="remove" @click="removeLink(index)"/>
                    </div>
                </li>
            </ul>
        </div>
        <div class="line low-opacity q-mt-md"></div>
        <q-btn color="green-6" label="Salvar Repertório" @click="salvarRepertorio()"/>
        <q-btn @click="router.push('/profile')" color="blue-7" flat label="voltar" />
    </div>
</q-page>
<FooterComponent/>
<AddMusicaModal v-if="addMusicaModal" @toggleAddMusicaModal="toggleAddMusicaModal()" @salvarMusicas="salvarMusicas"/>
</template>
<script setup lang="ts">
import FooterComponent from 'src/components/FooterComponent.vue';
import AddMusicaModal from 'src/components/AddMusicaModal.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { RepertorioRequest } from 'src/components/models';
const router = useRouter()

const generoOptions = ref<string[]>(['Rock', 'Pop', 'Sertanejo', 'Funk', 'Samba', 'Pagode', 'Forró', 'MPB', 'Gospel', 'Clássico', 'Jazz', 'Blues', 'Eletrônica', 'Reggae', 'Rap', 'Hip Hop', 'Metal', 'Country', 'Folk', 'Indie', 'Alternativo', 'Outro'])
const novoRepertorio = ref<RepertorioRequest>({
    nome: '',
    descricao: '',
    privado: false,
    genero: '',
    musicas: []
})

const addMusicaModal = ref(false)

function toggleAddMusicaModal() {
    addMusicaModal.value = !addMusicaModal.value
}

function removeLink(index: number) {
    novoRepertorio.value.musicas.splice(index, 1)
}

const salvarMusicas = (music: any) => {
    novoRepertorio.value.musicas.push(music)
}

function salvarRepertorio() {
    alert(JSON.stringify(novoRepertorio.value))
}

</script>
<style scoped>
@media (width >= 1000px){
    .page {
        max-width: 600px;
        margin: 0 auto;
    }	
}
</style>