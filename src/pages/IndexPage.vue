  <template>
  <q-page class="relative bg-light column animate__animated animate__fadeIn">
    <div class="row q-gutter-x-md no-wrap items-center justify-center">
        <q-avatar  style="border-bottom: 4px double black" size="100px" color="grey-4" text-color="white">
          <img :src="authStore.getInfoImg()" alt="avatar do usuário">
        </q-avatar>
        <div  class="text-right text-h4 margin-reset text-white text-bold q-mb-md  q-pb-md">
          <br>{{authStore.getInfoLogin()}}
            <span class="text-h6 mid-opacity text-white q-pb-md">
              <br>12 seguidores
              </span>

      </div>
        <div>
        <div>
        </div>
        </div>
      </div>
      <div v-if="repertorios.length > 0" class="line low-opacity"></div>
      <q-btn v-if="repertorios.length > 0" @click="router.push('/novo-repertorio')" label="Novo Repertório" class="q-mt-md q-mb-md q-mx-lg" color="orange-7" icon="post_add"/>
      <div v-if="repertoriosHandler.length > 0" class="bg-grey-10 w100 q-pb-md" style="z-index: 999;position: sticky;top:3rem">
        <q-input :disable="pagination.totalItems < 1" :label="pagination.totalItems < 1 ? 'Crie novos repertórios' :'Buscar em Meus Repertórios'" maxlength="40" color="grey-9" class="bg-white rounded-borders q-mt-md q-mx-lg" 
            outlined
            v-model="buscarRepertorio" @update:model-value="buscarRepertorioFunction()">
          <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <div class="w100 row no-wrap q-mt-md q-pl-lg q-gutter-x-md" v-if="selecao.selecionados.length > 0">
        <q-btn label="cancelar" icon="keyboard_return" dense class="select-action q-pa-sm text-black" @click="resetCheckedItems()" color="blue-3" />
        <q-btn :label="'remover ' + selecao.selecionados.length +' selecionados'" icon="delete_sweep" class="select-action q-pa-sm" dense @click="confirm = true"  color="negative" />
      </div>
      </div>
    <div class="line low-opacity q-my-md"></div>
    <div class="w100 column q-px-md">
      <div class="text-h5 text-grey-4">
        Meus Repertórios
      </div>
    </div>
    <div class="songlist-wrapper w100 column q-px-md q-gutter-y-sm q-mt-md">
      <div v-if="loading" class="w100 loading">
        <div class="loader"></div>
        <q-linear-progress indeterminate color="white" class="q-mt-lg"/>
      </div>
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
        <q-card v-if="pagination.totalItems == 0 && !loading" class="bg-grey-9 shadow-10 text-white q-mb-md">
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
                  <div  style="width:90%;" class="q-pt-lg text-h5 font-decorative-3">
                    {{ songlist.nome }}
                  </div>
                </q-item-label>
                <q-item-label style="font-size: 24x;" class="q-pt-sm text-bold mid-opacity">{{ songlist.descricao }}</q-item-label>
              </q-item-section>
              <q-item-section side v-if="!songlist.private" class="absolute-top-right">
                <q-icon  name="favorite" class="text-red"/>
                {{ songlist.curtidas < 10 ? '0' + songlist.curtidas : songlist.curtidas }} ‎‎
                <q-icon  name="library_music" class="text-grey-9"/>
                {{ songlist.musicas_size < 10 ? '0' + songlist.musicas_size : songlist.musicas_size }} ‎‎
              </q-item-section>
              <q-item-section side v-if="songlist.private">
                <q-icon name="lock" color="grey-9" />
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat icon-right="visibility" label="Ver Repertório" @click="verRepertorio(songlist._id)" color="primary" />
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
      <q-select style="width:192px" label="Items por página" class="w100 rounded-borders" dense outlined v-model="pagination.rowsPerPage" :options="pagination.paginationOptions"
       @update:model-value="handleSelect()"/>
      <p class="text-center q-mt-md mid-opacity">Mostrando {{ repertorios.length }} de {{pagination.totalItems}} Repertórios</p>
    </div>
    <FooterComponent class="q-mt-md" />
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="red" text-color="white" />
          <span class="q-ml-sm q-mt-md">Tem certeza que deseja remover permanentemente {{ selecao.selecionados.length }} repertório(s) ?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn dense @click="removeCheckedItems()" label="Confirmar" color="red" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
import { useQuasar } from 'quasar';


const loading = ref(true);
const authStore = useAuthStore();
const settingsStore = useSettingsStore();
const router =  useRouter();
const repertorios = ref<Repertorio[]>([]);
const buscarRepertorio = ref<string>('');
const $q = useQuasar()

const confirm = ref(false);

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

async function buscarRepertorioFunction() {
  if (buscarRepertorio.value.trim() == '' || buscarRepertorio.value.length == 0) {
    pagination.value.rowsPerPage = 5
    await consultarRepertoriosRequest()
      .then(() => {
        repertorios.value = repertoriosHandler.value;
      });
    return;
  } else {
    pagination.value.rowsPerPage = 50
    await consultarRepertoriosRequest()
      .then(() => {
        repertorios.value = repertoriosHandler.value.filter(songlist => songlist.nome.toLowerCase().includes(buscarRepertorio.value.toLowerCase()));
      });
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

function resetCheckedItems() {
  selecao.value.selecionados = [];
  selecao.value.selecionando = false;
}

async function removeCheckedItems() {
  const reqObject = {
    login: authStore.getInfoLogin(),
    senha: authStore.getInfoPassword(),
    idsRepertoriosArray: selecao.value.selecionados
  }
  await api.delete('/repertorios', { data: reqObject })
    .then((res) => {
      $q.notify({
            message: res.data.message,
            color: 'green-6',
            position: 'top',
            icon: 'delete_forever'
        })
      consultarRepertoriosRequest();
    })
    .catch((error) => {
      $q.notify({
            message: error.response.data.message,
            color: 'red-8',
            position: 'top',
            icon: 'error'
        })
    });
}

function handleSelect(){
  pagination.value.page = 1
  consultarRepertoriosRequest();
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
  await consultarRepertoriosRequest()
  .finally(() => {
      loading.value = false;
    })
    try{
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) { // Firefox
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
                document.documentElement.msRequestFullscreen();
            }
    } catch (e) {
      console.error(e)
    }
});
</script>
<style scoped>
.q-page{
  background: #eaeaeaba;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to top, #eaeaeaba, #222222);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to top, #eaeaeaba, #222222); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
.select-action {
  font-size: .8rem;
}
.q-card {
  border-radius: 8px;
  background: #C9D6FF;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #f0f0f0, #e0e0e0);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #dbdbdb, #c3c3c3); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.loading  {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background:rgba(25, 25, 25, 0.652);
  backdrop-filter: blur(5px);
}
.loader {
  width: 50px;
  aspect-ratio: 1;
  display: grid;
  filter: invert(1) drop-shadow(0 0 0.5rem #cdcdcd);
}
.loader::before,
.loader::after
{
  content: "";
  grid-area: 1/1;
  border-radius: 50%;
  background: repeating-conic-gradient(#0a551495,#000 1deg 18deg,#0000 20deg 36deg);
  -webkit-mask:repeating-radial-gradient(farthest-side,#000 0 10%,#0000 0 20%);
  animation: l10 4s infinite linear;
}
.loader::after{
  -webkit-mask:repeating-radial-gradient(farthest-side,#0000 0 10%,#000 0 20%);
  animation-direction: reverse;
}
@keyframes l10 {
  100% {
  transform:rotate(.5turn);
  }
}
</style>