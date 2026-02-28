<script setup>
import { useCartStore } from "@/stores/useCartStore";

//const cartStore = useCartStore();
defineEmits(["clear"]);

const props = defineProps({
  name: { type: String, required: true },
  count: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
});
</script>

<template>
  <li>
    <span>{{ props.name }} ({{ props.count }})</span>
    <span>{{ props.count * props.unitPrice }} €</span>
    <!--<button @click="cartStore.removeProduct(props.name)">🗑️</button>-->
    <button @click="$emit('clear')">Clear</button>
  </li>
</template>