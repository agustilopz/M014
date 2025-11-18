<template>
  <div class="add-task">
    <input
      v-model="taskText"
      placeholder="Afegir tasca..."
      type="text"
    />
    <button @click="addTask">Afegir</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add-task'])
const taskText = ref('')

const addTask = () => {
  if (taskText.value.trim() === '') return
  emit('add-task', taskText.value)
  taskText.value = ''
}
</script>

<style scoped>
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
</style>
