<template>
    <q-page class="bg-black" v-if="loading">
    </q-page>
    <q-page v-if="!loading" class="animate__animated animate__fadeIn animate__slower">
      <section>
      <p v-if="isAuthenticated" class="animate__animated animate__flipInX animate__slower q-py-xs q-pl-md text-bold bg-grey-9 text-blue-3">Bem Vindo, {{ authStore.getInfoNome()}}!</p>
      <p class="animate__animated animate__flipInY animate__slower q-pt-md text-bold text-center font-decorative-2 text-black" style="font-size: 1.1rem;filter:drop-shadow(0px 0px .2rem grey)">Crie, Compartilhe e Descubra<br>Repertórios Personalizados!</p>
      <div class="w-100 relative">
        <img
          src="https://images.unsplash.com/photo-1573006939324-641d31296356?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          class="img-responsive"
        />
        <div class="text-img text-h6 font-decorative-2 text-center animate__animated animate__zoomIn">
          <span class="gradient-text">Bem vindo ao</span><span class="gradient-text gradient-text-second"><br>FavTab</span>
        </div>
      </div>
      <p class="text-center font-decorative-2 q-mt-sm">Seu gerenciador de Repertórios Online</p>
      <q-tabs
      v-model="tab"
      inline-label
      outside-arrows
      mobile-arrows
      class="bg-grey-9 text-white shadow-2 animate__animated animate__flipInX animate__slower animation__delay-2s"
    >
    <q-tab name="Geral" icon="library_music" label="Geral" />
    <q-tab name="Sertanejo" icon="library_music" label="Sertanejo" />
    <q-tab name="Católicas" icon="library_music" label="Católicas" />
    <q-tab name="Gospel" icon="library_music" label="Gospel" />
    <q-tab name="MPB" icon="library_music" label="MPB" />
    <q-tab name="Rock" icon="library_music" label="Rock" />
    <q-tab name="Indie" icon="library_music" label="Indie" />
    </q-tabs>
        <div class="bg-grey-4 animate__animated animate__fadeInUp animate__slower tab-result row q-px-md q-py-md text-h6">
            <div  id="top-10-rep" class="q-mb-md">
              Top 10 Repertórios &#127925;<br><i>{{tab}}</i>
            <ol>
                <li><a href="#">Mix Energético</a></li>
                <li><a href="#">Coração Partido</a></li>
                <li><a href="#">Sexta-feira Relaxante</a></li>
                <li><a href="#">Viagem pela Estrada</a></li>
                <li><a href="#">Noites de Verão</a></li>
                <li><a href="#">Festa dos Anos 80</a></li>
                <li><a href="#">Café da Manhã Alegre</a></li>
                <li><a href="#">Trilha Sonora para Escrever</a></li>
                <li><a href="#">Clássicos do Jazz</a></li>
                <li><a href="#">Motivação Matinal</a></li>
            </ol>
            </div>
            <div class="q-pb-md text-h6">
              Top 10 Perfis &#11088;
              <ol>
                <li><a href="#">ghost_drummer </a>- 210 &#9825;</li>
                <li><a href="#">rocker210 </a>- 190 &#9825;</li>
                <li><a href="#">purple_pianist </a>- 180 &#9825;</li>
                <li><a href="#">johnny_theguitarrist </a>- 174 &#9825;</li>
                <li><a href="#">clean_toner </a>- 172 &#9825;</li>
                <li><a href="#">madbassist1 </a>- 142 &#9825;</li>
                <li><a href="#">joseph001 </a>- 138 &#9825;</li>
                <li><a href="#">jazzy_and_blues </a>- 130 &#9825;</li>
                <li><a href="#">alternativemaster0 </a>- 121 &#9825;</li>
                <li><a href="#">bestof_pop </a>- 99 &#9825;</li>
              </ol>
          </div>
          <div class="line low-opacity q-mb-md"></div>
          <div v-if="!isAuthenticated" class=" bg-white rounded-borders text-h6 q-py-md q-px-lg  mid-opacity text-bold text-center">
            Ainda não possui uma conta no FavTab?
            <q-btn @click="toggleLogin()" flat dense style="border: 1px solid grey" class="q-ml-sm q-px-sm" label="Registre-se Agora"/>
          </div>
          <div v-if="isAuthenticated" class=" bg-white rounded-borders text-h6 q-py-md q-px-lg  mid-opacity text-bold text-center">
            <span class="text-black">{{authStore.getInfoLogin()}}</span>, Compartilhe com seus amigos, Expanda a Comunidade!!
          </div>
          <div class="line low-opacity q-mt-md"></div>
        </div>
      </section>
      <FooterComponent class="q-mt-md" />
    </q-page>
    <LoginComponent @toggleLogin="toggleLogin()" v-if="isLogin"/>
    <div v-if="loading" :class="'w100 loading' + loadingClass">
      <div class="loader"></div>
      <p class="tex-white text-bold text-h6 text-blue-2 q-mt-sm">Inicializando Aplicativo</p>
      <q-linear-progress indeterminate color="white" class="q-mt-md"/>
      <p class="q-mt-xl w80 mid-opacity text-bold text-center text-white">
        App em Construção... &#128296;&#128295;<br>
        Deseja contribuir?<br>
      </p>
      <a class="text-blue-2" href="https://samuelvictorol.github.io/portfolio/contato">entre em contato</a>
    </div>
  </template>
<script setup lang="ts">
import LoginComponent from 'src/components/LoginComponent.vue';
import FooterComponent from 'src/components/FooterComponent.vue';
import { ref, computed, onBeforeMount } from 'vue'
import { useAuthStore } from 'src/stores/authStore';
import { api } from 'src/boot/axios';

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
const tab = ref<string>('Geral')
const isLogin = ref(false)
const loading = ref(true)
const loadingClass = ref('')

function toggleLogin () {
  isLogin.value = !isLogin.value  
}

function toggleLoading () {
    loading.value = !loading.value
}

async function initializeApp () {
  await api.post('/initialize-app').then(response => {
    console.log(JSON.stringify(response.data))
  })
}

// para melhorar perfomance e quebra do hibernate e ux quando app versao gratuita
onBeforeMount (async () => {
  await initializeApp()
  if(!isAuthenticated.value){
    setTimeout(() => {
      toggleLoading()
    }, 8000);
  } else {
    setTimeout(() => {
      toggleLoading()
    }, 2000);
  }
})

</script>
<style scoped>
#top-10-rep {
  border-bottom: 1px solid #2d2d2d52;
}

@media (width >= 600px){
  .tab-result {
    justify-content: center;
    gap: 2rem;
  }
  #top-10-rep {
    border-right: 1px solid #2d2d2d52;
    border-bottom: none;
    padding-right: 1.2rem;
  }
}

a{
  font-size: 1.1rem;
  text-decoration: none;
}

.img-responsive {
  width: 100vw; /* Garante que a imagem não ultrapasse o tamanho do contêiner */
  height: 55vh; /* Mantém a proporção da imagem */
}

.text-img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: transparent; /* Torna o texto transparente para aplicar o gradiente */
  font-weight: bold;
  font-size: 2rem;
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.6) !important;
  padding: 10px;
  border-radius: 8px;
  border-bottom: 1px solid grey;
  filter: drop-shadow(0 20px 0.25rem #000000cd);
}

.gradient-text {
  background-image: linear-gradient(to right, #c4c4c4, #838383); /* Gradiente da primeira cor */
  -webkit-background-clip: text; /* Aplica o gradiente ao texto */
  background-clip: text;
  color: transparent; /* Torna a cor do texto transparente */
}

.gradient-text-second {
  background-image: linear-gradient(to right, #9b9b9b, #a1a1a1); /* Gradiente da segunda cor */
  -webkit-background-clip: text; /* Aplica o gradiente ao texto */
  background-clip: text;
  color: transparent; /* Torna a cor do texto transparente */
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
