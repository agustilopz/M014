<script setup>
import { ref, computed } from 'vue'
// Dades reactives
const nombre = ref('Vue')
// Propietat calculada per convertir el nom en majuscules
const nomMajuscules = computed(() => nombre.value.toUpperCase())
</script>
<template>
    <div>
        <p>Nombre: {{ nombre }}</p>
        <p>Nom en majúscules (computed): {{ nomMajuscules }}</p>
    </div>
</template>