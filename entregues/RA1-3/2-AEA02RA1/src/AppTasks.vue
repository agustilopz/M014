<template>
  <div class="task-app">
    <h1>Gestor de Tasques</h1>

    <!-- Formulari d'afegir tasques -->
    <TaskForm @add-task="addTask" />

    <div class="filter">
      <label>
        <input type="checkbox" v-model="showOnlyPending" />
        Mostrar només pendents
      </label>
    </div>

    <!-- Llista de tasques -->
    <TaskList
      :tasks="filteredTasks"
      @delete-task="deleteTask"
      @toggle-task="toggleTask"
    />

    <div class="summary">
      <p>Total: {{ tasks.length }}</p>
      <p>Pendents: {{ tasks.filter(t => !t.completed).length }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import TaskForm from './components/TaskForm.vue'
import TaskList from './components/TaskList.vue'

const tasks = ref([
  { id: 1, text: 'Fer la compra setmanal', completed: false },
  { id: 2, text: 'Anar al gimnàs', completed: true },
  { id: 3, text: 'Llegir un llibre', completed: false }
])

const showOnlyPending = ref(false)

const addTask = (text) => {
  if (text.trim() === '') return
  tasks.value.push({
    id: tasks.value.length + 1,
    text,
    completed: false
  })
}

const deleteTask = (id) => {
  tasks.value = tasks.value.filter(task => task.id !== id)
}

const toggleTask = (id) => {
  const task = tasks.value.find(t => t.id === id)
  if (task) task.completed = !task.completed
}

const filteredTasks = computed(() => {
  return showOnlyPending.value
    ? tasks.value.filter(task => !task.completed)
    : tasks.value
})
</script>

<style scoped>
.task-app {
  max-width: 480px;
  margin: 60px auto;
  padding: 2rem;
  background-color: #f9fafb;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  font-family: 'Inter', sans-serif;
  color: #1f2937;
}

h1 {
  text-align: center;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.filter {
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #374151;
}

.summary {
  margin-top: 1.5rem;
  text-align: center;
  font-weight: 500;
  color: #374151;
}
</style>
