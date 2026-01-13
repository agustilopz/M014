<script setup>
import { useCounter } from '../composables/useCounter.js';

const { count, increment, decrement } = useCounter();

</script>

<template>

<h1>Prova Composable</h1>

<div class="card">
<p>Count: {{ count }}</p>
<button @click="increment">+</button>
<button @click="decrement">-</button>
  </div>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
