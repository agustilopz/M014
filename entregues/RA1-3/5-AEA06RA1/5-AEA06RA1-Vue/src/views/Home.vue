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
          <MovieCard :movie="movie" :key="movie.id" @delete-movie="deleteMovie" />
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;
}
h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}
button, .router-link {
  background: #ff9800;
  color: #fff;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1rem;
  transition: background 0.2s;
  text-decoration: none;
  display: inline-block;
}
button:hover, .router-link:hover {
  background: #e65100;
}

/* MovieCard pot tenir el seu propi estil, però aquí afegim padding general */
.grid > div {
  padding: 0.5rem;
}
</style>
