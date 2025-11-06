
<script setup>
import { ref, computed } from 'vue'
import TaskForm from './TaskForm.vue'
import TaskList from './TaskList.vue'

const tasks = ref([
  { id: 1, text: 'Fer la compra setmanal', completed: false },
  { id: 2, text: 'Anar al gimnàs', completed: true },
  { id: 3, text: 'Llegir un llibre', completed: false }
])

const taskText = ref('')
const showOnlyPending = ref(false)

const addTask = () => {
  if (taskText.value.trim() === '') return
  tasks.value.push({
    id: tasks.value.length + 1,
    text: taskText.value,
    completed: false
  })
  taskText.value = ''
}

const deleteTask = id => {
  tasks.value = tasks.value.filter(task => task.id !== id)
}

const filteredTasks = computed(() => {
  return showOnlyPending.value
    ? tasks.value.filter(task => !task.completed)
    : tasks.value
})
</script>


<template>
  <div class="task-app">
    <h1>Gestor de Tasques</h1>

    <TaskForm :addTaskFunction="addTask" />

    <div class="filter">
      <label>
        <input type="checkbox" v-model="showOnlyPending" />
        Mostrar només pendents
      </label>
    </div>

    <TaskList :taskList="tasks" :deleteTaskFunction="deleteTask"/>
    <ul v-if="filteredTasks.length > 0" class="task-list">
      <li v-for="task in filteredTasks" :key="task.id" class="task-item">
        <label class="task">
          <input type="checkbox" v-model="task.completed" />
          <span :class="{ completed: task.completed }">{{ task.text }}</span>
        </label>
        <button class="delete" @click="deleteTask(task.id)">✕</button>
      </li>
    </ul>

    <p v-else class="empty">No hi ha tasques per mostrar</p>

    <div class="summary">
      <p>Total: {{ tasks.length }}</p>
      <p>Pendents: {{ tasks.filter(task => !task.completed).length }}</p>
    </div>
  </div>
</template>

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

.add-task {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.add-task input {
  flex: 1;
  padding: 0.6rem 0.8rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.95rem;
}

.add-task input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.add-task button {
  padding: 0.6rem 1rem;
  background-color: #3b82f6;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
}

.add-task button:hover {
  background-color: #2563eb;
}

.filter {
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #374151;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 0.6rem 0.8rem;
  margin-bottom: 0.5rem;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.task-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
}

.task {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.completed {
  text-decoration: line-through;
  color: #9ca3af;
}

.delete {
  background: none;
  border: none;
  color: #ef4444;
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.2s ease;
}

.delete:hover {
  color: #b91c1c;
}

.empty {
  text-align: center;
  color: #6b7280;
  font-style: italic;
  margin-top: 1rem;
}

.summary {
  margin-top: 1.5rem;
  text-align: center;
  font-weight: 500;
  color: #374151;
}
</style>
