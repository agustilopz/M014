<script setup>
import { useBuildStore } from "@/stores/useBuildStore";
const buildStore = useBuildStore();
</script>

<template>
  <div class="current-build-widget">
    <h2>Muntatge actual</h2>
    <div>Total: {{ buildStore.totalPrice }} €</div>
    <ul>
      <li v-for="(items, name) in buildStore.groupedByName" :key="name">
      <span>{{ items[0].type }} - {{ name }} ({{ items.length }})</span>
        <button @click="buildStore.removeComponent(name)">🗑️</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.current-build-widget {
  background: #f8f8f8;
  border: 1px solid #ddd;
  padding: 1em;
  margin-bottom: 1em;
  border-radius: 8px;
}
.current-build-widget ul {
  list-style: none;
  padding: 0;
}
.current-build-widget li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5em;
}
</style>