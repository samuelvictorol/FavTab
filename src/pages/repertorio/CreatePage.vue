<template>
<q-page class="page bg-grey-3 q-pa-lg column">
    <div class="text-h5 text-center q-mt-sm text-bold font-decorative-2">Novo Repertório &#127926;</div>
    <div class="column q-gutter-y-md q-mt-sm">
        <q-input maxlength="40" color="grey-9" v-model="novoRepertorio.nome" label="Nome" outlined />
        <q-input type="textarea" maxlength="200" color="grey-9" v-model="novoRepertorio.descricao" label="Descrição" outlined />
        <q-select color="grey-9" v-model="novoRepertorio.genero" :options="novoRepertorio.generoOptions" label="Gênero" outlined />
        <div class="row items-center">
            <q-toggle color="blue-6" v-model="novoRepertorio.privado" label="Privado" />
            <q-icon size="sm" color="grey-6" class="q-ml-sm" name="lock"/>
        </div>
        <div class="line low-opacity q-mt-md"></div>
        <q-btn color="orange-7" dense icon="add" label="Adicionar Música" />
        <div class="musicas column justify-center items-center">
            <div class="text-h6 mid-opacity">Músicas Adicionadas</div>
            <div class="row items-center q-mt-md">
                <q-icon size="sm" color="grey-6" name="music_note"/>
                <div class="q-ml-md">Nome da Música</div>
                <q-icon size="sm" color="red-7" class="q-ml-md" name="delete"/>
            </div>
            <div class="row items-center q-mt-md">
                <q-icon size="sm" color="grey-6" name="music_note"/>
                <div class="q-ml-md">Nome da Música</div>
                <q-icon size="sm" color="red-7" class="q-ml-md" name="delete"/>
            </div>
            <div class="row items-center q-mt-md">
                <q-icon size="sm" color="grey-6" name="music_note"/>
                <div class="q-ml-md">Nome da Música</div>
                <q-icon size="sm" color="red-7" class="q-ml-md" name="delete"/>
            </div>
        </div>
        <div class="line low-opacity q-mt-md"></div>
        <q-btn color="green-6" label="Salvar Repertório" />
        <q-btn @click="router.push('/profile')" color="blue-7" flat label="voltar" />
    </div>
</q-page>
<FooterComponent/>
</template>
<script setup lang="ts">
import FooterComponent from 'src/components/FooterComponent.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const novoRepertorio = ref({
    nome: '',
    descricao: '',
    privado: false,
    genero: '',
    generoOptions: ['Rock', 'Pop', 'Sertanejo', 'Funk', 'Samba', 'Pagode', 'Forró', 'MPB', 'Gospel', 'Clássico', 'Jazz', 'Blues', 'Eletrônica', 'Reggae', 'Rap', 'Hip Hop', 'Metal', 'Country', 'Folk', 'Indie', 'Alternativo', 'Outro'],
    musicas: []
}) as any
</script>
<style scoped>
@media (width >= 1000px){
    .page {
        max-width: 600px;
        margin: 0 auto;
    }	
}
</style>