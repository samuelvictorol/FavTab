<template>
<q-page class="page bg-grey-3 q-pa-lg column">
    <q-btn @click="router.push('/profile')" color="blue-7" flat icon="chevron_left" label="voltar" dense size="md" class="absolute-top-left q-mt-xs" />
    <div class="text-h6 text-center q-mt-md bg-grey-4 rounded-borders title-width text-bold font-decorative-2 q-px-sm w100">{{novoRepertorio.nome.trim()=='' ? 'Novo Repertório' : novoRepertorio.nome}} &#127926;</div>
    <div class="column q-gutter-y-md q-mt-xs">
        <q-input maxlength="40" color="grey-9" v-model="novoRepertorio.nome" label="Nome*" outlined />
        <q-input type="textarea" maxlength="200" color="grey-9" v-model="novoRepertorio.descricao" label="Descrição" outlined />
        <q-select color="grey-9" v-model="novoRepertorio.genero" :options="generoOptions" label="Gênero" outlined />
        <div class="row items-center">
            <q-toggle color="blue-6" v-model="novoRepertorio.private" label="Privado" />
            <q-icon size="sm" color="grey-6" class="q-ml-sm" name="lock"/>
        </div>
        <div class="line low-opacity q-mt-md"></div>
        <q-btn @click="toggleAddMusicaModal()" color="blue-7" dense icon="library_music" label="Adicionar Músicas" />
        <div class="musicas column justify-center items-center">
        <div class="text-h6 mid-opacity"  v-if="novoRepertorio.musicas.length != 0">Músicas Adicionadas</div>
        <div class="line low-opacity q-my-md"></div>
        <div class="text-h6 text-grey-6" v-if="novoRepertorio.musicas.length == 0">Nenhuma música adicionada &#128531;</div>
            <ul class="reset-margin reset-padding w100 ">
                <li v-for="(musica, index) in novoRepertorio.musicas" :key="index" class=" w100 row items-center justify-between no-wrap">
                    <div class="row items-center">
                        <q-icon size="sm" color="blue-7" name="music_note"/>
                    </div>
                    <div class="">{{ musica.nome }}</div>
                    <div class="row items-center">
                        <q-icon size="md" color="red-7" name="remove" @click="removeLink(index)"/>
                    </div>
                </li>
            </ul>
        </div>
        <div class="line low-opacity q-mt-md"></div>
        <q-btn color="grey-9" label="Salvar Repertório" :disable="novoRepertorio.nome.trim() == ''" icon="add_to_photos" @click="salvarRepertorio()"/>
        <q-btn @click="router.push('/profile')" color="blue-7" flat label="voltar" />
    </div>
</q-page>
<FooterComponent/>
<AddMusicaModal v-if="addMusicaModal" @toggleAddMusicaModal="toggleAddMusicaModal()" @salvarMusicas="salvarMusicas"/>
</template>
<script setup lang="ts">
import FooterComponent from 'src/components/FooterComponent.vue';
import AddMusicaModal from 'src/components/AddMusicaModal.vue';
import { onBeforeMount, ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { RepertorioRequest } from 'src/components/models';
import { api } from 'src/boot/axios';
const router = useRouter()
import { useAuthStore } from 'src/stores/authStore';
const $q = useQuasar()

const authStore = useAuthStore();
const generoOptions = ref<string[]>(['Rock', 'Pop', 'Sertanejo', 'Funk', 'Samba', 'Pagode', 'Forró', 'MPB', 'Gospel', 'Clássico', 'Jazz', 'Blues', 'Eletrônica', 'Reggae', 'Rap', 'Hip Hop', 'Metal', 'Country', 'Folk', 'Indie', 'Alternativo', 'Outro'])
const novoRepertorio = ref<RepertorioRequest>({
    nome: '',
    descricao: '',
    private: false,
    genero: '',
    musicas: [],
    login: ''
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

async function salvarRepertorio() {
    await api.post('/novo-repertorio', novoRepertorio.value)
    .then((res) => {
        $q.notify({
            message: res.data.message,
            color: 'green-6',
            position: 'top',
            icon: 'add_to_photos'
        })
        router.push('/profile')
    })
    
}
onBeforeMount(() => {
    novoRepertorio.value.login = authStore.getInfoLogin()
})
</script>
<style scoped>
@media (width >= 1000px){
    .page {
        max-width: 600px;
        margin: 0 auto;
    }	
}
</style>