import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useBuildStore = defineStore('BuildStore', () => {

    //State
    const items = ref([])

    // Getters
    const totalPrice = computed(() => items.value.reduce((acumulador, elemento) => acumulador + elemento.price, 0))
    const groupedByType = computed(()=> {
        const grouped = groupBy(items.value, (item)=> item.type)
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

    const removeComponent = (itemName) => (items.value = items.value.filter(item => item.name !== itemName))

    const checkout = (item, count) => {}

})