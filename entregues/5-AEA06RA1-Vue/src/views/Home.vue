<script setup>
import { ref } from 'vue';
import { useFetch } from '../composables/useFetch.js';
import MovieCard from '../components/MovieCard.vue';


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
<MovieCard :movie="movie" :key="movie.id"/>
    </div>
   </div>
  </div>
  </div>

</template>

<style scoped>
</style>
