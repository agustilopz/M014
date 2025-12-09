<script setup>
import ExempleBasic from './components/ExempleBasic.vue';
import ProductList from './components/ProductList.vue';
import { ref } from 'vue';
import { useFetch } from './composables/useFetch.js';

const cerca = ref("chicken")
const url =  ref(`https://www.themealdb.com/api/json/v1/1/search.php?s=${cerca.value}`)

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
 <!-- <ExempleBasic /> -->
 <!-- <ProductList /> -->
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
