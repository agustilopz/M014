<script setup>
import { ref } from 'vue';
import { useFetch } from './composables/useFetch.js';


const cerca = ref("chicken")
const url =  ref(`https://www.themealdb.com/api/json/v1/1/search.php?s=chicken`)

const { data, error, loading, fetchData } = useFetch(url);


</script>

<template>
  <div>
   <h1>You did it</h1>
   <div v-if = "loading">Carregant...</div>
   <div v-else-if = "error">{{ error }}</div>
   <div v-else>

    <div v-if="data && data.meals">{{ data }}</div>
   </div>
  </div>

</template>

<style scoped>
</style>
