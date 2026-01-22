<script setup>

import {inject} from 'vue';

const shoppingCart = inject('shoppingCart');

const addProduct = (product) => {
    shoppingCart.push(product);
};

</script>


<template>

<h2>Carret</h2>

<ul>

    <li v-for="item in shoppingCart" :key="item.id">{{ item.name }} - {{ item.price }}</li>
</ul>

</template>