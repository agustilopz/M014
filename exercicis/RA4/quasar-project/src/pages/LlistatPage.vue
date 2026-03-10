<template>
  listId: {{ listId }}
    <ul>
      <li>a</li>
      <li>b</li>
      <li>c</li>
    </ul>
</template>

<script setup>
defineProps({
  listId: String
})
</script>
