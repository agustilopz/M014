<template>

   <div>
    <header>
      <h1>Afegir Pel·lícula</h1>
    </header>
    <main>
      <form @submit.prevent="createMovie">
        <label for="title">Títol:</label>
        <input type="text" id="title" v-model="movie.title" required /><br>

        <label for="year">Any:</label>
        <input type="number" id="year" v-model="movie.year" required /><br>

        <label for="country">País:</label>
        <input type="text" id="country" v-model="movie.country" required /><br>

        <label for="director">Director:</label>
        <input type="text" id="director" v-model="movie.director" required /><br>

        <label for="runtime">Durada (minuts):</label>
        <input type="number" id="runtime" v-model="movie.runtime" required /><br>

        <label for="poster_path">Poster URL:</label>
        <input type="url" id="poster_path" v-model="movie.poster_path" required /> <br>

        <button type="submit">Desar Canvis</button>
      </form>
    </main>
  </div>
</template>

<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'

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
main {
  max-width: 420px;
  margin: 2rem auto;
  background: #fff;
  padding: 2rem 2.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
}
header h1 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
}
form label {
  display: block;
  margin-top: 1rem;
  color: #444;
  font-weight: 500;
}
form input {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.3rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
}
button[type="submit"] {
  margin-top: 2rem;
  width: 100%;
  background: #ff9800;
  color: #fff;
  border: none;
  padding: 0.8rem 0;
  border-radius: 6px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
}
button[type="submit"]:hover {
  background: #e65100;
}
</style>