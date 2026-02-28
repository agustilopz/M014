import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { groupBy } from 'lodash'

export const useCartStore = defineStore('CartStore', () => {

    // State
    const items = ref([])

    // Getters
    const count = computed(() => items.value.length)
    const isEmpty = computed(() => count.value === 0)
    const totalPrice = computed(() => items.value.reduce((acumulador, elemento) => acumulador + elemento.price, 0))
    const groupedByName = computed(() => {
        const grouped = groupBy(items.value, (item) => item.name)
        const sorted = Object.keys(grouped).sort()
        let inOrder = {}
        sorted.forEach((key) => (inOrder[key] = grouped[key]))
        return inOrder
    })

    // Actions
    function addProduct(contador, item) {
        contador = parseInt(contador)
        for (let i = 0; i < contador; i++) {
            items.value.push(item)
        }
    }

    function removeProduct(itemName) {
        const idx = items.value.findIndex(item => item.name === itemName)
        if (idx !== -1) items.value.splice(idx, 1)
    }

    function $reset() {
        items.value = []
    }

    function checkout(item, count) {
        // Actualitza la quantitat d'un component concret
        const filtered = items.value.filter(i => i.name !== item.name)
        for (let i = 0; i < count; i++) {
            filtered.push(item)
        }
        items.value = filtered
    }

    return { items, count, isEmpty, totalPrice, groupedByName, addProduct, removeProduct, checkout, $reset }
})