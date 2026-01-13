<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
// import products from "@/data/products.json";
import { useProductStore } from "@/stores/useProductStore";
import { storeToRefs } from "pinia";
import { useCartStore } from "./stores/useCartStore";

const productStore = useProductStore();
const cartStore = useCartStore();
const { products } = storeToRefs(productStore);

</script>

<template>
  <div class="container">
    <TheHeader />
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard
        v-for="product in productStore.products"
        :key="product.name"
        :product="product"
        @addToCart="cartStore.items.push({product})"
      />
    </ul>
  </div>
</template>
