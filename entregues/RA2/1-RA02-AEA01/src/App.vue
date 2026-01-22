<script setup>
import ComponentCard from './components/ComponentCard.vue';
import { storeToRefs } from 'pinia';
import { useHardwareStore } from './stores/useHardwareStore';
import { useBuildStore } from './stores/useBuildStore';

const hardwareStore = useHardwareStore();
const buildStore = useBuildStore();
hardwareStore.loadHardware();
const { hardwareRef } = storeToRefs(hardwareStore)

</script>


<template>
<div>
  <ul>
    <ComponentCard
    v-for="hardware in hardwareRef"
    :key="hardware.name"
    :hardware="hardware"
    @addComponent="buildStore.addComponent($event, hardware)"
    />
  </ul>
</div>
</template>

<style scoped>

</style>
