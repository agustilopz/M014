<script setup>
import { ref } from 'vue'

const isLoggedIn = ref(false)
</script>

<template>
    <div>
        <p v-if="isLoggedIn">Benvingut, usuari!</p>
        <p v-else>Si us plau, incia sessió</p>
    </div>
</template>
