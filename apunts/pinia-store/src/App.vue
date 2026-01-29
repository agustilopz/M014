<script setup>
import { storeToRefs } from 'pinia';

import { useProductStore } from './stores/useProductStore';
import { useCartStore } from './stores/useCartStore';
import StoreItem from './components/StoreItem.vue';
import NavBar from './components/NavBar.vue';

const productStore = useProductStore();
const cartStore = useCartStore();
productStore.loadProducts();
const { productRef } = storeToRefs(productStore)
</script>

<template>
<div>
  <NavBar/>
  <ul>
    <StoreItem
      v-for="product in productRef"
      :key="product.name"
      :product="product"
      @addComponent="cartStore.addComponent($event, product)"
    />
  </ul>
</div>
</template>