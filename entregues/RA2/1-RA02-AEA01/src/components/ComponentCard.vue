<script setup>

import { ref } from "vue";
defineProps({
    hardware: Object
});

defineEmits(["addComponent"]);

const count = ref(0);
</script>

<template>
<li>
    <img :src="`/images/${hardware.image}`" width="80px" border="1px solid black">
    <div>Type: {{ hardware.type }}</div>
    <div>{{ hardware.name }} - <span>{{ hardware.price }}€</span></div>


</li>

</template>