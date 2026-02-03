<script setup lang="ts">
const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession();
</script>

<template>
   <UCard>
  <div v-if="loggedIn">
    <UButton @click="clear">Logout</UButton>
    {{ user }}
  </div>
  <div v-else>
    <UButton @click="openInPopup('/auth/github')">Login</UButton>
  </div>
  </UCard>
</template>
