<script setup>
import { ref } from "vue";

const props = defineProps({
    product: Object
});

const emit = defineEmits(["addProduct"]);

const count = ref(1);
function addToCart() {
    if (count.value > 0) emit("addProduct", count.value);
}
</script>

<template>
    <li>
        <img :src="`/images/${product.image}`" width="80px" border="1px solid black">
        <div>{{ product.name }} - <span>{{ product.price }}€</span></div>
        <div>Type: {{ product.type }}</div>
        <div>
            <input type="number" min="1" v-model.number="count" style="width: 50px;">
            <button @click="addToCart">Add to Cart</button>
        </div>
    </li>
</template>