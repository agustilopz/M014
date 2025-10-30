<script setup>
import { ref } from 'vue'

const nomUsuari = ref('')
</script>

<template>
  <h1>Gestor de Tasques</h1>

<div>
<!--input-->
<p>Nom de l'usuari: {{ nomUsuari }}</p>
<input v-model="nomUsuari" placeholder="Escriu una nova tasca" ></input>
<button>Afegir</button><br>
<input type="checkbox" /> Mostrar només tasques pendents

</div>


</template>

<style scoped></style>



