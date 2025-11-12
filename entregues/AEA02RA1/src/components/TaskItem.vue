<template>
  <li class="task-item">
    <label class="task">
      <input
        type="checkbox"
        :checked="task.completed"
        @change="emit('toggle-task', task.id)"
      />
      <span :class="{ completed: task.completed }">{{ task.text }}</span>
    </label>
    <button class="delete" @click="emit('delete-task', task.id)">✕</button>
  </li>
</template>

<script setup>
const props = defineProps({
  task: Object
})

const emit = defineEmits(['delete-task', 'toggle-task'])
</script>

<style scoped>
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
</style>
