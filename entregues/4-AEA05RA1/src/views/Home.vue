<script setup>
import { ref } from 'vue';
import { useFetch } from '../composables/useFetch.js';

import MealCard from '../components/MealCard.vue';


const cerca = ref("chicken")
const url =  ref(`https://www.themealdb.com/api/json/v1/1/search.php?s=${cerca.value}`);

const { data, error, loading, fetchData } = useFetch(url);


</script>

<template>
    <h1>Home</h1>
  <div>
   <div v-if = "loading">Carregant...</div>
   <div v-else-if = "error">{{ error }}</div>
   <div v-else>

    <div v-if="data && data.meals">
    <div v-for="meal in data.meals">
      <MealCard :meal="meal" />
    </div>
   </div>
  </div>
  </div>

</template>

<style scoped>
</style>
