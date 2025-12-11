<script setup>

import { ref } from 'vue';

const recepta = ref('')

const emit = defineEmits(['cercaRecepta'])

const cercaRecepta = () => {
    emit('cercaRecepta', recepta.value)
}


</script>


<template>

    <div>
        <input v-model="recepta" placeholder="Cerca una recepta"/>
        <button @click="cercaRecepta">Buscar</button>
    </div>


</template>