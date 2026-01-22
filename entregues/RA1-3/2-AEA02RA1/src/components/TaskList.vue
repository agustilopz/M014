<template>
  <ul v-if="tasks.length > 0" class="task-list">
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @delete-task="emit('delete-task', $event)"
      @toggle-task="emit('toggle-task', $event)"
    />
  </ul>

  <p v-else class="empty">No hi ha tasques per mostrar</p>
</template>

<script setup>
import TaskItem from './TaskItem.vue'

const props = defineProps({
  tasks: Array
})

const emit = defineEmits(['delete-task', 'toggle-task'])
</script>

<style scoped>
.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.empty {
  text-align: center;
  color: #6b7280;
  font-style: italic;
  margin-top: 1rem;
}
</style>
