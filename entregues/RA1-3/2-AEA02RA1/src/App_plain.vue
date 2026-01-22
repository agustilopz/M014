<template>

  <div class="task-app">
    <h1>Gestor de Tasques</h1>

    <div>
      <input v-model="taskText" placeholder="Afegir tasca..." type="text"></input>
      <button @click="addTask">Afegir</button><br>
    </div>

    <div>
      <input type="checkbox" v-model="showOnlyPending" /> Mostrar només tasques pendents
    </div>

    <ul v-if="filteredTasks.length > 0">
      <li v-for="task in filteredTasks" :key="task.id" class="task-item">
        <input type="checkbox" v-model="task.completed" />
        <span>{{ task.text }}</span>
        <button @click="deleteTask(task.id)">Eliminar</button>
      </li>
    </ul>
    <p v-else>No hi ha tasques per mostrar</p>

    <div class="summary">
      <p>Total: {{ tasks.length }}</p>
      <p>Pendents: {{tasks.filter(task => !task.completed).length}}</p>
    </div>
  </div>
</template>


<script setup>
import { ref, computed } from 'vue'

const tasks = ref([
  { id: 1, text: 'Fer la compra setmanal', completed: false },
  { id: 2, text: 'Anar al gimnàs', completed: true },
  { id: 3, text: 'Llegir un llibre', completed: false }])


const taskText = ref('')


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

const deleteTask = (id) => tasks.value = tasks.value.filter(task => task.id !== id);


// Estat del checkbox per mostrar només tasques pendents
const showOnlyPending = ref(false)
const filteredTasks = computed(() => {
  if (showOnlyPending.value) {
    return tasks.value.filter(task => !task.completed);
  }
  return tasks.value;
});

</script>

<style scoped></style>
