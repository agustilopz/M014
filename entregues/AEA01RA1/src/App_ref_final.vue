<template>
  <div class="task-app">
    <h1>Gestor de Tasques</h1>

    <!-- Formulari per afegir tasques -->
    <div>
      <input 
        v-model="newTaskTitle" 
        type="text" 
        placeholder="Afegir tasca..." 
        @keyup.enter="addTask"
      />
      <button @click="addTask">Afegir tasca</button>
    </div>

    <!-- Filtres per veure tasques pendents o totes -->
    <div>
      <button @click="filterTasks('all')">Totes les tasques</button>
      <button @click="filterTasks('pending')">Tasques Pendents</button>
      <button @click="filterTasks('completed')">Tasques Completes</button>
    </div>

    <!-- Llista de tasques -->
    <ul>
      <li v-for="task in filteredTasks" :key="task.id" class="task-item">
        <input 
          type="checkbox" 
          v-model="task.completed" 
          @change="toggleTaskStatus(task)"
        />
        <span :class="{ completed: task.completed }">{{ task.title }}</span>
        <span v-if="task.createdAt">{{ task.createdAt }}</span>
        <button @click="deleteTask(task.id)">Eliminar</button>
      </li>
    </ul>

    <!-- Resum de tasques -->
    <div class="summary">
      <p>Total de tasques: {{ tasks.length }}</p>
      <p>Tasques pendents: {{ pendingTasksCount }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Dades reactives
const tasks = ref([
  { id: 1, title: 'Estudiar Vue 3', completed: false, createdAt: '2023-11-01' },
  { id: 2, title: 'Comprar menjar', completed: true, createdAt: '2023-11-02' },
])

const newTaskTitle = ref('')

let nextId = ref(3)  // Per afegir tasques amb id únic

// Funció per afegir tasques
const addTask = () => {
  if (newTaskTitle.value.trim() !== '') {
    tasks.value.push({
      id: nextId.value++,
      title: newTaskTitle.value,
      completed: false,
      createdAt: new Date().toLocaleDateString(),
    })
    newTaskTitle.value = ''  // Netegem l'input després d'afegir
  }
}

// Funció per canviar l'estat de la tasca
const toggleTaskStatus = (task) => {
  task.completed = !task.completed
}

// Funció per eliminar una tasca
const deleteTask = (taskId) => {
  tasks.value = tasks.value.filter(task => task.id !== taskId)
}

// Filtres per mostrar tasques
const taskFilter = ref('all')

const filterTasks = (filter) => {
  taskFilter.value = filter
}

const filteredTasks = computed(() => {
  if (taskFilter.value === 'pending') {
    return tasks.value.filter(task => !task.completed)
  } else if (taskFilter.value === 'completed') {
    return tasks.value.filter(task => task.completed)
  } else {
    return tasks.value
  }
})

// Computed per comptar tasques pendents
const pendingTasksCount = computed(() => {
  return tasks.value.filter(task => !task.completed).length
})
</script>

<style scoped>
.task-app {
  font-family: Arial, sans-serif;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

input[type="text"] {
  padding: 8px;
  margin-right: 10px;
  width: 200px;
}

button {
  padding: 8px 16px;
  cursor: pointer;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.completed {
  text-decoration: line-through;
}

.summary {
  margin-top: 20px;
  font-weight: bold;
}
</style>
