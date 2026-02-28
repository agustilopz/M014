<script setup>
import CartWidget from './CartWidget.vue';
import { useUserSessionStore } from '@/stores/userSessionStore';
const userSession = useUserSessionStore();
</script>

<template>
  <header>
    <h1>The Pineapple Stand</h1>
    <div class="user-bar">
      <span>👤 {{ userSession.username }}</span>
      <button @click="userSession.visitGithub">GitHub</button>
    </div>
    <CartWidget />
  </header>
</template>