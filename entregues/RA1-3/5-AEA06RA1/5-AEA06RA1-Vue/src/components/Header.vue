<template>
  <header class="main-header">
    <nav>
      <RouterLink v-if="!auth.isAuthenticated" to="/login">Login</RouterLink>
      <RouterLink v-if="!auth.isAuthenticated" to="/register">Register</RouterLink>
      <button v-if="auth.isAuthenticated" @click="logout">Logout</button>
    </nav>
  </header>
</template>

<script setup>
import { auth } from '../auth.js'
import { useRouter, RouterLink } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()

function logout() {
  // Opcional: pots fer una petició a /logout del backend
  fetch('http://localhost:3000/logout', {
    method: 'POST',
    credentials: 'include'
  })
  auth.isAuthenticated = false
  auth.user = null
  router.push('/login')
}
</script>

<style scoped>
.main-header {
  background: #222;
  color: #fff;
  padding: 1rem;
}
nav {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}
button, a {
  background: #ff9800;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.2s;
}
button:hover, a:hover {
  background: #e65100;
}
</style>
