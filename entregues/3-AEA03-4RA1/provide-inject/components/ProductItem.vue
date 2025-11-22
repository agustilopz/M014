<script setup>   


import { defineProps, inject } from 'vue';

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
});

const cart = inject('shoppingCart');

const addToCart = () => {
    cart.value.push(props.product);
};




</script>


<template>

        <div>
        <p>{{ props.product.name }} - {{ props.product.price }}€</p>
        <button @click="addToCart">Add to Cart</button>
        </div>

</template>