<script setup>
import { ref } from 'vue';
import { useFetch } from './composables/useFetch.js';
import { RouterLink } from 'vue-router'


import MealCard from './components/MealCard.vue';


const cerca = ref("chicken")
const url =  ref(`https://www.themealdb.com/api/json/v1/1/search.php?s=${cerca.value}`);

const { data, error, loading, fetchData } = useFetch(url);


</script>

<template>
 
   <nav>
    <RouterLink to="/">Inici</RouterLink> |
    <RouterLink to="/meals">Receptes</RouterLink> |
  </nav>
  <RouterView />

</template>

<style scoped>
</style>





