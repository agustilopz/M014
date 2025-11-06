<script setup>

const props = defineProps({
    addTaskFunction: Function,
    taskText: Object
})


</script>

<template>

    <div class="add-task">
      <input v-model="taskText" placeholder="Afegir tasca..." type="text" />
      <button @click="addTask">Afegir</button>
    </div>    


</template>
