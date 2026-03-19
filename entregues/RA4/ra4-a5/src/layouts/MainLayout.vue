<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div v-if="loggedIn" class="flex items-center gap-2">
          <q-avatar square dense size="32">{{ user?.login?.charAt(0)?.toUpperCase() }}</q-avatar>
          <div class="hidden sm:flex">{{ user?.login }}</div>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list padding>
        <q-item clickable v-ripple to="/">
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/admin">
          <q-item-section>
            <q-item-label>Movies</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <template v-if="!loggedIn">
          <q-item clickable v-ripple to="/login">
            <q-item-section>
              <q-item-label>Login</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/register">
            <q-item-section>
              <q-item-label>Register</q-item-label>
            </q-item-section>
          </q-item>
        </template>

        <template v-else>
          <q-item clickable v-ripple @click="logout">
            <q-item-section>
              <q-item-label>Logout</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserSession } from 'src/composables/useUserSession'

const leftDrawerOpen = ref(false)
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const { user, loggedIn, fetch, clear } = useUserSession()
const router = useRouter()

async function logout() {
  // call composable clear which calls backend logout
  await clear()
  // ensure session state refreshed and navigate
  await fetch()
  router.push('/login')
}
</script>
