<script setup>
import { ref } from 'vue';
import Home from './views/Home.vue';
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
    <RouterLink to="/">Inici</RouterLink> 

  <Home/>
  <RouterView />

</template>

<style scoped>

</style>


 
