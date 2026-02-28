import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import hardware from '@/data/hardware.json'

export const useHardwareStore = defineStore('hardware', () => {
    const hardwareRef = ref([])

    function loadHardware() {
        hardwareRef.value = hardware;
    }

    return {hardwareRef, loadHardware}
})