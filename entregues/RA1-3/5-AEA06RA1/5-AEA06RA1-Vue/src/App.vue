<script setup>
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

</script>

<template>
  <nav>
    <RouterLink to="/">Inici</RouterLink>
    <RouterLink to="/login">Login</RouterLink>
    <RouterLink to="/register">Registre</RouterLink>
  </nav>
  <RouterView />

</template>

<style scoped>
nav {
  background: #222;
  padding: 1rem;
  margin-bottom: 2rem;
}
nav a {
  color: #fff;
  text-decoration: none;
  margin-right: 1.5rem;
  font-weight: bold;
  font-size: 1.1rem;
  transition: color 0.2s;
}
nav a.router-link-exact-active {
  color: #ff9800;
}
</style>
