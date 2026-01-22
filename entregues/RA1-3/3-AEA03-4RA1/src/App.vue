<script setup>
import { RouterLink } from 'vue-router'

</script>

<template>
  <nav>
    <RouterLink to="/home">Inici</RouterLink> |
    <RouterLink to="/recipes">Receptes</RouterLink> |
    <RouterLink to="/provideInject">Provide & Inject</RouterLink>
  </nav>
  <RouterView />
</template>

<style scoped>
</style>
