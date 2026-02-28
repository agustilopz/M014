import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

function groupBy(array, keyFn) {
    return array.reduce((result, item) => {
        const key = keyFn(item)
        if (!result[key]) result[key] = []
        result[key].push(item)
        return result
    }, {})
}

export const useBuildStore = defineStore('BuildStore', () => {
    // State
    const items = ref([])

    // Getters
    const totalPrice = computed(() => items.value.reduce((acumulador, elemento) => acumulador + elemento.price, 0))
    const groupedByName = computed(()=> {
        const grouped = groupBy(items.value, (item)=> item.name)
        const sorted = Object.keys(grouped).sort()
        let inOrder = {}
        sorted.forEach((key)=> (inOrder[key] = grouped[key]))
        return inOrder
    })
    
    // Actions
    function addComponent(contador, item) {
        contador = parseInt(contador)
        for (let i = 0; i < contador; i++) {
            items.value.push(item)
        }
    }

function removeComponent(itemName) {
    const idx = items.value.findIndex(item => item.name === itemName)
    if (idx !== -1) items.value.splice(idx, 1)
}

    function checkout(item, count) {
        // Actualitza la quantitat d'un component concret
        const filtered = items.value.filter(i => i.name !== item.name)
        for (let i = 0; i < count; i++) {
            filtered.push(item)
        }
        items.value = filtered
    }

    return { items, totalPrice, groupedByName, addComponent, removeComponent, checkout }
})