<template>
    <q-page class="animate__animated animate__fadeIn">
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
      <section>
      <p class="animate__animated animate__flipInY animate__slower q-pt-md text-bold text-center font-decorative-2 text-black" style="font-size: 1.1rem;filter:drop-shadow(0px 0px .2rem grey)">Crie, Compartilhe e Descubra<br>Repertórios Personalizados</p>
      <q-tabs
        v-model="tab"
        inline-label
        outside-arrows
        mobile-arrows
        class="bg-grey-9 text-white shadow-2 animate__animated animate__fadeInUp animate__slower"
      >
      <q-tab name="" icon="library_music" label="Geral" />
      <q-tab name="Sertanejo" icon="library_music" label="Sertanejo" />
      <q-tab name="Católicas" icon="library_music" label="Católicas" />
      <q-tab name="Gospel" icon="library_music" label="Gospel" />
      <q-tab name="MPB" icon="library_music" label="MPB" />
      <q-tab name="Rock" icon="library_music" label="Rock" />
      <q-tab name="Indie" icon="library_music" label="Indie" />
      </q-tabs>
        <div class="bg-blue-1 animate__animated animate__fadeInUp animate__slower tab-result row q-px-md q-py-md text-h6">
            <div>
              Top 10 Repertórios &#127925; {{tab}}
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
          <div class=" bg-white rounded-borders text-h6 q-py-md q-px-lg  mid-opacity text-bold text-center">Ainda não possui uma conta no FavTab? <q-btn @click="toggleLogin()" flat dense style="border: 1px solid grey" class="q-px-sm" label="Registre-se Agora"/></div>
          <div class="line low-opacity q-my-md"></div>
        </div>
      </section>
      <FooterComponent class="q-mt-md" />
    </q-page>
    <LoginComponent @toggleLogin="toggleLogin()" v-if="isLogin"/>
  </template>
<script setup lang="ts">
import LoginComponent from 'src/components/LoginComponent.vue';
import FooterComponent from 'src/components/FooterComponent.vue';
import { ref } from 'vue'
const tab = ref<string>('')
const isLogin = ref(false)

function toggleLogin () {
  isLogin.value = !isLogin.value  
}

</script>
<style scoped>

@media (width >= 600px){
  .tab-result {
    justify-content: center;
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
</style>
