<template>
  <q-page class="relative q-pb-xl">
    <div id="repertorio-name" class="q-py-xs row items-center justify-center">
      <q-btn @click="router.push('/profile')" flat icon="keyboard_return" size="md" class="absolute-left" color="grey-6" />
      <div class="text-h5 font-decorative-2 q-pt-sm q-pb-xs text-white text-center">best of metal</div>
    </div>  
    <div class="status-repertorio row w100 no-wrap q-mt-xs items-center justify-center">
      <q-chip class="bg-black-ui text-white" label="8 músicas" icon="library_music" color="orange-6" />
      <q-chip class="bg-black-ui text-white" label="user123" icon="person" color="blue-6" />
      <q-chip class="bg-black-ui text-white" label="12 favs" icon="favorite" color="red-6" />
    </div>
    <div class="q-mt-sm q-mx-sm musicas rounded-borders row no-wrap bg-black-ui text-white q-pa-md items-center justify-between">
      <q-icon name="play_circle" color="blue-6" size="md"/>
      <div>Master Of Puppets - Metallica</div>
      <q-icon name="visibility" color="pink-2" size="sm"/>
    </div>
    <div class="q-mt-sm q-mx-sm musicas rounded-borders row no-wrap bg-black-ui text-white q-pa-md items-center justify-between">
      <q-icon name="play_circle" color="blue-6" size="md"/>
      <div>Tears Don't Fall - Bullet For My Valentine</div>
      <q-icon name="visibility" color="pink-2" size="sm"/>
    </div>
    <div class="q-mt-sm q-mx-sm musicas rounded-borders row no-wrap bg-black-ui text-white q-pa-md items-center justify-between">
      <q-icon name="play_circle" color="blue-6" size="md"/>
      <div>Wasted Years - Iron Maiden</div>
      <q-icon name="visibility" color="pink-2" size="sm"/>
    </div>
    <div class="q-mt-sm q-mx-sm musicas rounded-borders row no-wrap bg-black-ui text-white q-pa-md items-center justify-between">
      <q-icon name="play_circle" color="blue-6" size="md"/>
      <div>Closure - Asking Alexandria</div>
      <q-icon name="visibility" color="pink-2" size="sm"/>
    </div>
    <div class="q-mt-sm q-mx-sm musicas rounded-borders row no-wrap bg-black-ui text-white q-pa-md items-center justify-between">
      <q-icon name="play_circle" color="blue-6" size="md"/>
      <div>I Hate Everything About You</div>
      <q-icon name="visibility" color="pink-2" size="sm"/>
    </div>
    <div class="q-mt-sm q-mx-sm musicas rounded-borders row no-wrap bg-black-ui text-white q-pa-md items-center justify-between">
      <q-icon name="play_circle" color="blue-6" size="md"/>
      <div>I Hate Everything About You</div>
      <q-icon name="visibility" color="pink-2" size="sm"/>
    </div>
    <div class="q-mt-sm q-mx-sm musicas rounded-borders row no-wrap bg-black-ui text-white q-pa-md items-center justify-between">
      <q-icon name="play_circle" color="blue-6" size="md"/>
      <div>Psychosocial - Slipknot</div>
      <q-icon name="visibility" color="pink-2" size="sm"/>
    </div>
    <div class="q-mt-sm q-mx-sm musicas rounded-borders row no-wrap bg-black-ui text-white q-pa-md items-center justify-between">
      <q-icon name="play_circle" color="blue-6" size="md"/>
      <div>Carry on - Angra</div>
      <q-icon name="visibility" color="pink-2" size="sm"/>
    </div>
    <div class="w100 q-py-lg"></div>
    <div id="actions" class="w100 row no-wrap q-pl-md q-gutter-x-md">
      <q-btn class=" rounded-borders"  icon="add_circle" color="green" size="xl"/>
      <!-- <q-btn class=" rounded-borders"  icon="favorite" color="red" size="xl"/> -->
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";


const router = useRouter()

</script>

<style scoped>
#repertorio-name {
  position: sticky!important;
  top: 3.15rem;
  background: #000000a1;
  backdrop-filter: blur(3px);
  z-index: 100;
}
#actions {
  position: fixed;
  bottom: 1rem;
  opacity: .7;
  transition: all 0.3s ease;
}
#actions:hover {
  opacity: 1;
}

.bg-black-ui {
  background: #000000d4;  /* fallback for old browsers */
background: -webkit-linear-gradient(to bottom, #2f2d2d, #000000);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to bottom, #2f2d2d, #000000); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

</style>