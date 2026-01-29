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

<style scoped>
.user-bar {
  display: flex;
  align-items: center;
  gap: 1em;
  margin-bottom: 0.5em;
}

.user-bar button {
  background: #222;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.3em 0.8em;
  cursor: pointer;
}

.user-bar button:hover {
  background: #444;
}
</style>