<template>
  <div>
    <slot v-if="loggedIn" />

    <q-page v-else class="q-pa-md flex flex-center">
      <q-card class="max-w-md q-mx-auto">
        <q-card-section>
          <div class="text-h6">Accés restringit</div>
        </q-card-section>

        <q-card-section>
          <p>Cal iniciar sessió per veure aquesta pàgina.</p>
          <div class="row q-gutter-sm q-mt-md">
            <q-btn to="/login" label="Anar a Login" color="primary" />
            <q-btn to="/register" label="Registrar-se" flat />
          </div>
        </q-card-section>
      </q-card>
    </q-page>
  </div>
</template>

<script setup>
import { useUserSession } from 'src/composables/useUserSession'
const { loggedIn } = useUserSession()
</script>
