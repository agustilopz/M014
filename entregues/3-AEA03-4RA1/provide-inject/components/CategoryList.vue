<script setup>

import { inject } from 'vue';

import ProductItem from './ProductItem.vue';

const products = inject('productList');



</script>

<template>

    <h2>Productes</h2>

    <div v-for="product in products" :key="product.id">
        <ProductItem :product="product" />
    </div>


</template>