<script setup>
import { ref } from "vue";
const props = defineProps({
    hardware: Object
});
const emit = defineEmits(["addComponent"]);
const count = ref(1);
function addToBuild() {
    if (count.value > 0) emit("addComponent", count.value);
}
</script>

<template>
<li>
    <img :src="`/images/${hardware.image}`" width="80px" border="1px solid black">
    <div>Type: {{ hardware.type }}</div>
    <div>{{ hardware.name }} - <span>{{ hardware.price }}€</span></div>
    <div>
        <input type="number" min="1" v-model.number="count" style="width: 50px;">
        <button @click="addToBuild">Afegir al Muntatge</button>
    </div>
</li>
</template>