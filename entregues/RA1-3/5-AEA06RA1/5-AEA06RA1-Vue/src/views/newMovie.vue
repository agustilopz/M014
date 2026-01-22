<template>

   <div>
    <header>
      <h1>Afegir Pel·lícula</h1>
    </header>
    <main>
      <form @submit.prevent="createMovie">
        <label for="title">Títol:</label>
        <input type="text" id="title"  required /><br>

        <label for="year">Any:</label>
        <input type="number" id="year"  required /><br>

        <label for="country">País:</label>
        <input type="text" id="country"  required /><br>

        <label for="director">Director:</label>
        <input type="text" id="director"  required /><br>

        <label for="runtime">Durada (minuts):</label>
        <input type="number" id="runtime" required /><br>

        <label for="poster_path">Poster URL:</label>
        <input type="url" id="poster_path"  required /> <br>

        <button @click="createMovie" type="submit">Desar Canvis</button>
      </form>
    </main>
  </div>
</template>

<script setup>

import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const movie = ref({
  title: '',
  year: '',
  country: '',
  director: '',
  runtime: '',
  poster_path: ''
})



async function createMovie() {
  await fetch(`http://localhost:3000/movies/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(movie.value),
    credentials: 'include'
  })
  router.push('/')
}


</script>

<style scoped>
/* Pots importar el CSS extern o posar l'estil aquí */
</style>