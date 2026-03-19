<template>
  <q-toolbar>
    <q-toolbar-title>My App</q-toolbar-title>
    <div class="q-toolbar-actions">
      <div v-if="loggedIn">
        {{ user?.login }}
        <q-btn flat @click="logout">Logout</q-btn>
      </div>
      <div v-else>
        <q-btn flat to="/login">Login</q-btn>
      </div>
    </div>
  </q-toolbar>
</template>

<script setup>
import { useUserSession } from 'composables/useUserSession'
const { user, loggedIn, clear } = useUserSession()
function logout () {
  // call backend to clear session if endpoint exists
  clear()
  // redirect to login
  window.location.href = '/login'
}
</script>
