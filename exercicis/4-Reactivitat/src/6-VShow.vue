<script setup>
import { ref } from 'vue'

const mostrar = ref(true)
</script>

<template>
<button @click="mostrar = !mostrar">Alternar Visibilitat</button>
<p v-show="mostrar">Aquest text es mostra o amaga sense eliminar-lo del DOM</p>
</template>
