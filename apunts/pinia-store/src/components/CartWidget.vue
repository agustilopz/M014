<script setup>
import { useCartStore } from "@/stores/useCartStore";
import CartItem from "./CartItem.vue";

const cartStore = useCartStore();
</script>

<template>
  <div class="current-build-widget">
    <div class="cart-header">
      <h2>Cart Store</h2>
      <span>{{ cartStore.count }}</span>
    </div>
    <div v-if="!cartStore.isEmpty">
      <div>Total: {{ cartStore.totalPrice }} €</div>
      <ul>
        <template v-for="(productsByName, type) in cartStore.groupedByType" :key="type">
          <li>-{{ type }}-</li>
          <CartItem
            v-for="(items, name) in productsByName"
            :key="`${type}-${name}`"
            :name="name"
            :count="items.length"
            :unit-price="items[0].price"
            @clear="cartStore.removeProduct(name)"
          />
        </template>
      </ul>
      <button @click="cartStore.$reset">Clear Cart</button>
    </div>
    <div v-if="cartStore.isEmpty"><em>Cart is Empty</em></div>
  </div>
</template>

<style scoped>
</style>