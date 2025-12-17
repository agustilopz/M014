<script setup>
import { ref } from 'vue';
import { useFetch } from '../composables/useFetch.js';
import MovieCard from '../components/MovieCard.vue';
import { RouterLink, RouterView } from 'vue-router';


const url = ref(`http://localhost:3000/movies`);

const { data, error, loading, fetchData } = useFetch(url);

function deleteMovie(id) {
    fetch(`http://localhost:3000/movies/${id}`, {
        method: 'DELETE',
        credentials: 'include'
    }).then(() => {
        fetchData();
    });
}

</script>

<template>
  <h1>Home</h1>
  <div>
    <div v-if="loading">Carregant...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
<RouterLink to="/newMovie">Afegir nova pel·lícula</RouterLink>
      <div class="grid" v-if="data && data.movies">
        <div v-for="movie in data.movies">
          <MovieCard :movie="movie" :key="movie.id" @delete-movie="deleteMovie"/>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped></style>
