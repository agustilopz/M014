<template>

   <div>
    <header>
      <h1>Editar Pel·lícula: {{ movie.title }}</h1>
    </header>
    <main>
      <form @submit.prevent="updateMovie">
        <label for="title">Títol:</label>
        <input type="text" id="title" v-model="movie.title" required />

        <label for="year">Any:</label>
        <input type="number" id="year" v-model="movie.year" required />

        <label for="country">País:</label>
        <input type="text" id="country" v-model="movie.country" required />

        <label for="director">Director:</label>
        <input type="text" id="director" v-model="movie.director" required />

        <label for="runtime">Durada (minuts):</label>
        <input type="number" id="runtime" v-model="movie.runtime" required />

        <label for="poster_path">Poster URL:</label>
        <input type="url" id="poster_path" v-model="movie.poster_path" placeholder="https://..." />

        <button @click="updateMovie" type="submit">Desar Canvis</button>
      </form>
    </main>
  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { watch } from 'vue'

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



onMounted(async () => {
  const res = await fetch(`http://localhost:3000/movies/${route.params.idMovie}`, { credentials: 'include' })
  const data = await res.json()
  if (data.movie) movie.value = data.movie
})

async function updateMovie() {
  await fetch(`http://localhost:3000/movies/${route.params.idMovie}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(movie.value)
  })
  router.push('/movies')
}


</script>

<style scoped>
/* Pots importar el CSS extern o posar l'estil aquí */
</style>