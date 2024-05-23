<template>
  <q-page class="relative bg-light column animate__animated animate__fadeIn">
    <div class="column items-center justify-center q-pt-md">
        <q-avatar  style="border-bottom: 4px double black" size="180px" font-size="52px" color="grey-4" text-color="white">
          <img :src="authStore.getInfoImg()" alt="avatar do usuário">
        </q-avatar>
        <p class="text-h6 margin-reset q-pt-md">
          {{authStore.getInfoNome()}}
        </p>
        <div>
        <div>
            <q-icon size="sm"  name="star" class="text-warning" v-for="i in 5" :key="i"/>
            <q-tooltip anchor="center left">
              <!-- a cada 100 curtidas + 1 estrela -->
              530 curtidas totais
            </q-tooltip>
        </div>
        </div>
      </div>
      <div class="line low-opacity q-mt-md"></div>
      <q-btn @click="router.push('/novo-repertorio')" label="Novo Repertório" class="q-mt-md q-mb-sm q-mx-lg" color="green-5" icon="add"/>
      <div class="bg-light w100 q-pb-md" style="z-index: 999;position: sticky;top:3rem">
        <q-input label="Buscar em Meus Repertórios" maxlength="40" color="grey-9" class="bg-white rounded-borders q-mt-md q-mx-lg" outlined  v-model="buscarRepertorio">
          <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <div class="bg-light w100 row no-wrap q-mt-md justify-center q-gutter-x-md" v-if="selecao.selecionados.length > 0">
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
      <div class="my-songlist"  v-for="(songlist, index) in songlists" :key="index">
        <q-card class="q-mb-md">
          <q-card-section>
            <q-item>
              <q-item-section>
                <q-item-label class="row no-wrap text-h6 row items-center">
                  <q-checkbox v-model="selecao.selecionados" :val="songlist.id" @update:model-value="addCheckSonglist(songlist)" dense class="q-mr-sm" />
                  {{ songlist.nome }}
                </q-item-label>
                <q-item-label class="q-pt-sm" caption>{{ utils.formatBigStrings(songlist.descricao, 100) }}</q-item-label>
              </q-item-section>
              <q-item-section side v-if="!songlist.private">
                <q-icon name="favorite" :class="songlist.avaliacao >= 50 ? 'text-red' : 'text-yellow-8'"/>
                <q-tooltip anchor="center left">
                  {{ songlist.avaliacao }} curtidas
                </q-tooltip>
              </q-item-section>
              <q-item-section side v-if="songlist.private">
                <q-icon  name="lock" />
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Excluir" color="negative" />
            <q-btn flat label="Ver Repertório" @click="router.push('/repertorio')" color="primary" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <div id="pagination" class="q-mt-md w100 column q-px-md items-center q-mb-md">
      <div class=" q-mb-md row no-wrap items-center">
        <q-btn :disabled="pagination.isFirstPage" dense icon="first_page" class="q-mr-xs"/>
        <q-btn :disabled="pagination.isFirstPage" dense icon="chevron_left" class="q-mr-sm"/>
        <p class="reset-margin">
          <strong>5</strong> de <strong>{{pagination.totalItems}}</strong>
        </p>
        <q-btn :disabled="pagination.isLastPage" dense icon="chevron_right" class="q-ml-sm"/>
        <q-btn :disabled="pagination.isLastPage" dense icon="last_page" class="q-ml-xs"/>
      </div>
      <q-select style="width:192px" label="Items por página" class="w100 rounded-borders" dense outlined v-model="pagination.rowsPerPage" :options="pagination.paginationOptions"/>
    </div>
    <FooterComponent class="q-mt-md" />
  </q-page>
</template>

<script setup lang="ts">
import FooterComponent from 'src/components/FooterComponent.vue';
import { Pagination, Songlist } from 'src/components/models';
import { Utils } from 'src/utils/Utils';
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { useAuthStore } from 'src/stores/authStore';

const authStore = useAuthStore();
const router =  useRouter();
const songlists = ref<Songlist[]>([]);
const buscarRepertorio = ref<string>('');
const utils = new Utils();

const pagination = ref<Pagination>({
  page: 0,
  rowsPerPage: 5,
  isLastPage: false,
  isFirstPage: true,
  totalItems: 5,
  paginationOptions: [5, 10, 15, 20]
})

const selecao = ref({
  selecionados: [],
}) as any


function addCheckSonglist(songlist: Songlist)
{
  console.log(selecao.value.selecionados);
}

function resetCheckedItems() {
  selecao.value.selecionados = [];
  selecao.value.selecionando = false;
}

function removeCheckedItems() {
  songlists.value = songlists.value.filter(songlist => !selecao.value.selecionados.includes(songlist.id));
  resetCheckedItems();
}

generateSongList();

function generateSongList() {
  for (let i = 0; i < 5; i++) {
    const randomSong: Songlist = {
      id: generateRandomId(),
      nome: generateRandomName(),
      private: generateRandomBoolean(),
      descricao: generateRandomDescription(),
      avaliacao: generateRandomRating(),
    };
    songlists.value.push(randomSong);
  }
}

function generateRandomId() {
  // Aqui você pode implementar a lógica para gerar IDs aleatórios
  return Math.floor(Math.random() * 1000);
}

function generateRandomName() {
  const names = ['Repertório Igreja', 'Barzinho Rock Pub', "Flashback 70's", 'Best of Metal', 'INICIANTE - MPB'];
  return names[Math.floor(Math.random() * names.length)];
}

function generateRandomBoolean() {
  return Math.random() < 0.5; // Retorna verdadeiro ou falso aleatoriamente
}

function generateRandomDescription() {
  const descriptions = ['Lorem ipsum dolor sit amet. Et maiores nostrum id doloremque odio non omnis voluptatem cum tempore labore sed corporis dolores sit cupiditate corporis ea nulla harum. Et corrupti quisquam At sint omnis qui placeat ratione in impedit reiciendis. Eos quas quia est voluptas numquam et similique velit et dolorum facere aut cupiditate iste ut dolorem adipisci est itaque inventore. Ut enim veniam et neque optio sit accusantium molestias sed enim nobis qui optio fugiat ut magni accusamus eos perferendis quam.'];
  return descriptions[0];
}

function generateRandomRating() {
  return Math.floor(Math.random() * 120) + 1;
}
</script>
<style scoped>
.select-action {
  font-size: .8rem;
}
</style>