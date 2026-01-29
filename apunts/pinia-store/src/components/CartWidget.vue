<script setup>

import { useCartStore } from "@/stores/useCartStore";

const cartStore = useCartStore();

</script>

<template>
  <div class="current-build-widget">
    <h2>Cart Store</h2>
    <div v-if="!cartStore.isEmpty">
      <div>Total: {{ cartStore.totalPrice }} €</div>
      <ul>
        <li v-for="(items, name) in cartStore.groupedByName" :key="name">
          <span>{{ items[0].type }} - {{ name }} ({{ items.length }})</span>
          <button @click="cartStore.removeProduct(name)">🗑️</button>
        </li>
      </ul>
      <button @click="cartStore.$reset">Clear Cart</button>
    </div>
    <div v-if="cartStore.isEmpty"><em>Cart is Empty</em></div>

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