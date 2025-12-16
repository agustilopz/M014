<script setup>
import { ref } from 'vue';
import { useFetch } from '../composables/useFetch.js';
;


const url =  ref(`http://localhost:3000/movies`);

const { data, error, loading, fetchData } = useFetch(url);

</script>

<template>
    <h1>Home</h1>


  <div>
   <div v-if = "loading">Carregant...</div>
   <div v-else-if = "error">{{ error }}</div>
   <div v-else>

    <div class="grid" v-if="data && data.movies">
    <div v-for="movie in data.movies">
<div class="movie-card">
      <img width="150" :src="movie.poster_path" :alt="movie.title">
      <h3>{{ movie.title }}</h3>
      <p>{{ movie.year }} - {{ movie.director }}</p>
</div>
    </div>
   </div>
  </div>
  </div>

</template>

<style scoped>
</style>
