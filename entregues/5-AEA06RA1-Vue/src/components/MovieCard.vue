<script setup>

import { RouterLink, RouterView } from 'vue-router';

defineProps({
    movie: Object
})

</script>


<template>
<div class="movie-card">
      <img width="150" :src="movie.poster_path" :alt="movie.title">
      <h3>{{ movie.title }}</h3>
      <p>{{ movie.year }} - {{ movie.director }}</p>
        <RouterLink :to="`/editMovie/${movie.id}`" >Editar </RouterLink>
        
</div>


</template>