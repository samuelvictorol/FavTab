<template>
  <q-page class="bg-light column">
    <q-btn label="Novo Repertório" class="q-mt-md q-mx-lg" color="green-5" icon="add"/>
    <div class="line low-opacity q-my-md"></div>
    <div class="text-h5 mid-opacity q-pl-md">Meus Repertórios</div>
    <q-btn v-for="(songlist, index) in songlists"/>
  </q-page>
</template>

<script setup lang="ts">
import { Songlist } from 'src/components/models';
import { ref } from 'vue';

const songlists = ref<Songlist[]>([]);

generateSongList();

function generateSongList() {
  for (let i = 0; i < 5; i++) {
    const randomSong: Songlist = {
      id: generateRandomId(),
      nome: generateRandomName(),
      private: generateRandomBoolean(),
      descricao: generateRandomDescription(),
      avaliacao: generateRandomRating()
    };
    songlists.value.push(randomSong);
  }
}

function generateRandomId() {
  // Aqui você pode implementar a lógica para gerar IDs aleatórios
  return Math.floor(Math.random() * 1000);
}

function generateRandomName() {
  const names = ['Song 1', 'Song 2', 'Song 3', 'Song 4', 'Song 5'];
  return names[Math.floor(Math.random() * names.length)];
}

function generateRandomBoolean() {
  return Math.random() < 0.5; // Retorna verdadeiro ou falso aleatoriamente
}

function generateRandomDescription() {
  const descriptions = ['Description 1', 'Description 2', 'Description 3', 'Description 4', 'Description 5'];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

function generateRandomRating() {
  return Math.floor(Math.random() * 5) + 1;
}


</script>
