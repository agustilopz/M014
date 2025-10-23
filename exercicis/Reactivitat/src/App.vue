<script setup>
import { ref } from 'vue'

const contador = ref(0)

const incrementar = () => {
  contador.value++
}

const resetear = () => {
  contador.value = 0
}

</script>

<template>
  <div>
    <h1>Hello Vue 3 + Vite!</h1>
    <p>El comptador és {{ contador }}</p>
     <button  @click="incrementar" >Click Me</button>
     <button  @click="resetear" >Reset</button>
  </div>
</template>

<style scoped>

button {
  padding: 10px 20px;
  color: black;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
}
</style>
