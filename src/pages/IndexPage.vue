<template>
  <q-page class="relative bg-light column animate__animated animate__fadeIn animate__slower">
    <div class="column items-center justify-center q-pt-md">
        <q-avatar  style="border-bottom: 4px double black" size="180px" font-size="52px" color="grey-4" text-color="white">
          <img :src="authStore.getInfoImg()" alt="avatar do usuário">
        </q-avatar>
        <div  class="w80 text-center text-h5 margin-reset q-pt-md">
          {{authStore.getInfoNome().toUpperCase()}}
            
            <span class="text-h6 text-center mid-opacity margin-reset">
              <br>&#128100; {{authStore.getInfoLogin()}}
          </span>

      </div>
        <div>
        <div>
        </div>
        </div>
      </div>
      <div class="line low-opacity"></div>
      <q-btn @click="router.push('/novo-repertorio')" label="Novo Repertório" class="q-mt-md q-mb-sm q-mx-lg" color="green-5" icon="post_add"/>
      <div class="bg-light w100 q-pb-md" style="z-index: 999;position: sticky;top:3rem">
        <q-input :disable="pagination.totalItems < 1" :label="pagination.totalItems < 1 ? 'Crie novos repertórios' :'Buscar em Meus Repertórios'" maxlength="40" color="grey-9" class="bg-white rounded-borders q-mt-md q-mx-lg" outlined @update:model-value="buscarRepertorioFunction()" v-model="buscarRepertorio">
          <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <div class="bg-light w100 row no-wrap q-mt-md q-pl-lg q-gutter-x-md" v-if="selecao.selecionados.length > 0">
        <q-btn label="cancelar" icon="keyboard_return" dense class="select-action q-pa-sm text-black" @click="resetCheckedItems()" color="" />
        <q-btn label="remover selecionados" icon="delete_sweep" class="select-action q-pa-sm" dense @click="removeCheckedItems()"  color="negative" />
      </div>
      </div>
    <div class="line low-opacity q-my-md"></div>
    <div class="w100 column q-px-md">
      <div class="text-h5 mid-opacity">
        Meus Repertórios
      </div>
    </div>
    <div class="songlist-wrapper w100 column q-px-md q-gutter-y-sm q-mt-md">
      <div id="no-results">
        <q-card v-if="repertorios.length === 0 && buscarRepertorio.length > 0" class="q-mb-md">
          <q-card-section>
            <q-item>
              <q-item-section>
                <q-item-label class="text-h6 text-center mid-opacity">
                  Nenhum repertório encontrado &#128269;&#128531;
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
        <q-card v-if="pagination.totalItems == 0" class="bg-grey-8 text-white q-mb-md">
          <q-card-section>
            <q-item>
              <q-item-section>
                <q-item-label class="text-h6 text-center ">
                  Você ainda não possui repertórios criados &#128263;
                  <q-btn @click="router.push('/novo-repertorio')" dense label="Criar Primeiro Repertório" class="q-mt-md q-mb-sm q-px-lg" color="purple-5" icon="post_add"/>

                </q-item-label>
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </div>
      <div class="my-songlist"  v-for="(songlist, index) in repertorios" :key="index">
        <q-card class="q-mb-md">
          <q-card-section>
            <q-item>
              <q-item-section>
                <q-item-label class="row no-wrap text-h6 row items-center">
                  <q-checkbox v-model="selecao.selecionados" :val="songlist._id" @update:model-value="addCheckSonglist()" dense color="grey-8" class="absolute-top-left q-pt-xs" />
                  <div  style="width:90%;" class="q-pt-lg text-h6 font-decorative-3">
                    {{ songlist.nome }}
                  </div>
                </q-item-label>
                <q-item-label class="q-pt-sm text-bold" caption>{{ songlist.descricao }}</q-item-label>
              </q-item-section>
              <q-item-section side v-if="!songlist.private" class="absolute-top-right">
                <q-icon  name="favorite" class="text-red"/>
                {{ songlist.curtidas < 10 ? '0' + songlist.curtidas : songlist.curtidas }} ‎‎
              </q-item-section>
              <q-item-section side v-if="songlist.private">
                <q-icon  name="lock" />
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Excluir" color="negative" />
            <q-btn flat label="Ver Repertório" @click="verRepertorio(songlist._id)" color="primary" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <div id="pagination" v-if="pagination.totalItems > 0" class="q-mt-md w100 column q-px-md items-center q-mb-md">
      <div class=" q-mb-md row no-wrap items-center">
        <q-btn :disabled="pagination.isFirstPage" @click="gotoFirstLastPage('first')" dense icon="first_page" class="q-mr-xs"/>
        <q-btn :disabled="pagination.isFirstPage" @click="changePagePagination(-1)" dense icon="chevron_left" class="q-mr-sm"/>
        <p class="reset-margin">
          <strong>{{pagination.page}}</strong> - {{pagination.totalPages}} páginas
        </p>
        <q-btn :disabled="pagination.isLastPage" @click="changePagePagination(1)" dense icon="chevron_right" class="q-ml-sm"/>
        <q-btn :disabled="pagination.isLastPage" @click="gotoFirstLastPage('last')" dense icon="last_page" class="q-ml-xs"/>
      </div>
      <q-select style="width:192px" label="Items por página" class="w100 rounded-borders" dense outlined v-model="pagination.rowsPerPage" :options="pagination.paginationOptions"  @update:model-value="consultarRepertoriosRequest()"/>
      <p class="text-center q-mt-md mid-opacity">Mostrando {{ repertorios.length }} de {{pagination.totalItems}} Repertórios</p>
    </div>
    <FooterComponent class="q-mt-md" />
  </q-page>
</template>

<script setup lang="ts">
import FooterComponent from 'src/components/FooterComponent.vue';
import { Pagination, Repertorio } from 'src/components/models';
import { onBeforeMount, ref } from 'vue';
import { useRouter } from "vue-router";
import { useAuthStore } from 'src/stores/authStore';
import { useSettingsStore } from 'src/stores/settingsStore';
import { api } from 'src/boot/axios';

const authStore = useAuthStore();
const settingsStore = useSettingsStore();
const router =  useRouter();
const repertorios = ref<Repertorio[]>([]);
const buscarRepertorio = ref<string>('');

const pagination = ref<Pagination>({
  page: 1,
  rowsPerPage: 5,
  isLastPage: false,
  isFirstPage: true,
  totalItems: 0,
  totalPages: 1,
  paginationOptions: [5, 10, 15, 20]
})

const selecao = ref({
  selecionados: [],
}) as any

async function changePagePagination (page: number) {
  pagination.value.page += page;
  await consultarRepertoriosRequest();
}

const repertoriosHandler = ref<Repertorio[]>([]);

function buscarRepertorioFunction() {
  // console.log(buscarRepertorio.value);
  if (buscarRepertorio.value.trim() == '') {
    repertorios.value = repertoriosHandler.value;
  } else {
    repertorios.value = repertoriosHandler.value.filter(songlist => songlist.nome.toLowerCase().includes(buscarRepertorio.value.toLowerCase()));
  }
}

function verRepertorio(id: string) {
  settingsStore.setRepertorioViewHandle(id);
    router.push(`/repertorio`);
}

async function gotoFirstLastPage(cmd: string){
  if(cmd === 'first'){
    pagination.value.page = 1;
  } else {
    pagination.value.page = pagination.value.totalPages;
  }
  await consultarRepertoriosRequest();
}

function addCheckSonglist()
{
  // console.log(JSON.stringify(selecao.value.selecionados));
}

function resetCheckedItems() {
  selecao.value.selecionados = [];
  selecao.value.selecionando = false;
}

function removeCheckedItems() {
  repertorios.value = repertorios.value.filter(songlist => !selecao.value.selecionados.includes(songlist._id));
  resetCheckedItems();
}

const consultarRepertoriosRequest = async () => {
  const { page, rowsPerPage } = pagination.value;
  const query = `${authStore.getInfoLogin()}/${authStore.getInfoPassword()}?page=${page}&rowsPerPage=${rowsPerPage}`;

  try {
    const response = await api.get(`/repertorios/${query}`);
    const data = response.data;

    repertorios.value = data.repertorios;
    repertoriosHandler.value = data.repertorios;
    pagination.value.totalItems = data.pagination.totalItems;
    pagination.value.isLastPage = data.pagination.isLastPage;
    pagination.value.isFirstPage = data.pagination.isFirstPage;
    pagination.value.page = data.pagination.page;
    pagination.value.rowsPerPage = data.pagination.rowsPerPage;
    pagination.value.totalPages = data.pagination.totalPages;
  } catch (error) {
    console.error("Erro ao consultar repertórios:", error);
  }
};

onBeforeMount(async () => {
  await consultarRepertoriosRequest();
});
</script>
<style scoped>
.select-action {
  font-size: .8rem;
}
.q-card {
  border-radius: 20px;
  background: #C9D6FF;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to top, #E2E2E2, #C9D6FF);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to top, #E2E2E2, #d4d4d4); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

</style>