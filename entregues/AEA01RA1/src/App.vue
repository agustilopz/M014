<template>
  <h1>Gestor de Tasques</h1>

<div>

  
<input v-model="taskText" placeholder="Afegir tasca" type="text" ></input>
<button @click="addTask">Afegir tasca</button><br>
</div>

<input  type="checkbox" v-model="showOnlyPending"/> Mostrar només tasques pendents


<ul>
  <li v-for="task in tasks" :key="task.id">
    <input type="checkbox" v-model="task.completed" /> {{task.completed}}
    <span>{{ task.text }}</span>
    <button @click="deleteTask(task.id)">Eliminar</button>
    


  </li>
</ul>
</template>


<script setup>
import { ref } from 'vue'

const tasks = ref([
  { id: 1, text: 'Fer la compra setmanal', completed: false },
  { id: 2, text: 'Anar al gimnàs', completed: true },
  { id: 3, text: 'Llegir un llibre', completed: false }])


  const taskText = ref('')


  // Variable reactiva per al filtre
    const showOnlyPending = ref(false)


  const addTask = () => {
    if (taskText.value.trim() === '') return; // Evita afegir tasques buides
    tasks.value.push({
      id: tasks.value.length + 1,
      text: taskText.value,
      completed: false
    });
    taskText.value = ''; // Neteja el camp d'entrada després d'afegir la tasca
  }

  const changeTaskStatus = (task) => {
    task.completed = !task.completed;
  }

  const deleteTask = (id) => {
    tasks.value = tasks.value.filter(task => task.id !== id);
  }

</script>

<style scoped></style>



