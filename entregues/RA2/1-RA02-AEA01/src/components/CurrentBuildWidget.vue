<script setup>
import { ref } from "vue";
import { useBuildStore } from "@/stores/useBuildStore";
import ComponentCard from "./ComponentCard.vue";
import { build } from "vite";

const active = ref(false);
const buildStore = useBuildStore();

</script>

<template>

    <div>{{ buildStore.totalPrice }}</div>

    <ul>
        <ComponentCard v-for="(items, name) in buildStore.groupedByType" :key="name" :hardware="items[0]"
            :count="items.length" @updateCount="buildStore.checkout(items[0], $event)"
            @clear="buildStore.removeComponent(name)" />
    </ul>


</template>