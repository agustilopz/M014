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
    const groupedByType = computed(() => {
        const byType = groupBy(items.value, (item) => item.type)
        const result = {}
        Object.keys(byType).sort().forEach((type) => {
            const byName = groupBy(byType[type], (item) => item.name)
            const sorted = Object.keys(byName).sort()
            result[type] = {}
            sorted.forEach((key) => (result[type][key] = byName[key]))
        })
        return result
    })

    // Actions
    function addProduct(contador, item) {
        contador = parseInt(contador)
        for (let i = 0; i < contador; i++) {
            items.value.push(item)
        }
    }

    function removeProduct(itemName) {
        items.value = items.value.filter(item => item.name !== itemName)
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

    return { items, count, isEmpty, totalPrice, groupedByType, addProduct, removeProduct, checkout, $reset }
})