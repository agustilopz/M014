<script setup>
import { ref } from 'vue';
import Home from './views/Home.vue';
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <nav>
    <RouterLink to="/">Inici</RouterLink>
  </nav>
  <RouterView />

</template>

<style scoped></style>
