<script setup>
import { RouterLink } from 'vue-router'
import Home from './views/Home.vue'
import Frameworks from './views/Frameworks.vue'
import FrameworkDetail from './views/FrameworkDetail.vue'

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
