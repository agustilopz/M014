<script setup>
import { provide, ref } from 'vue';

import CategoryList from './components/CategoryList.vue'
import Cart from './components/Cart.vue'


const productList = ref([
    { id: 1, name: 'Auriculars Wireless', price: 59.99 },
    { id: 2, name: 'Rellotge Intel·ligent', price: 129.99 },
    { id: 3, name: 'Tablet 10 polzades', price: 199.99 },
    { id: 4, name: 'Portàtil Ultrafí', price: 899.99 },
    { id: 5, name: 'Càmera Digital', price: 249.99 }
    
]);

const shoppingCart = ref([]);

provide('productList', productList);
provide('shoppingCart', shoppingCart);

</script>


<template>

<CategoryList />

<Cart />

</template>