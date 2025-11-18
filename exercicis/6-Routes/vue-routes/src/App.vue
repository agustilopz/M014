<script setup>
import { RouterLink } from 'vue-router'

</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink> |
    <RouterLink to="/frameworks">Frameworks</RouterLink>
  </nav>
  <RouterView />

    <!--<Home /> -->
</template>

<style scoped></style>
