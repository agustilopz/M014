<script setup>

import { useFetch } from '../composables/useFetch.js';
import ProductItem from './ProductItem.vue';

const { data, error, loading, fetchData } = useFetch('https://dummyjson.com/products');
console.log(data);
</script>

<template>

<ProductItem v-for="product in data.products" 
    :key="product.id"
    :title="product.title"
    :thumbnail="product.thumbnail"
    :description="product.description"
    :price="product.price"
    />

</template>