<script setup>

import { RouterLink, RouterView } from 'vue-router';

defineProps({
    movie: Object
})
const emit = defineEmits(['delete-movie']);
function deleteMovie(id) {
    emit('delete-movie', id);
}

</script>


<template>
    <div class="movie-card">
        <img width="150" :src="movie.poster_path" :alt="movie.title">
        <h3>{{ movie.title }}</h3>
        <p>{{ movie.year }} - {{ movie.director }}</p>
        <RouterLink :to="`/editMovie/${movie.id}`">Editar </RouterLink>
        <button @click="deleteMovie(movie.id)">Eliminar</button>

    </div>


</template>