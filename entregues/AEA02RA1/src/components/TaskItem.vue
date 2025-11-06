<script setup>

const props = defineProps({
    task: Object,
    deleteTask: Function
})

</script>

<template>

    <li class="task-item">
        <label class="task">
            <input type="checkbox" v-model="task.completed" />
            <span :class="{ completed: task.completed }">{{ task.text }}</span>
        </label>
        <button class="delete" @click="deleteTask(task.id)">✕</button>
    </li>

</template>
