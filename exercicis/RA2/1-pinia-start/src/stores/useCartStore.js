import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { groupBy } from 'lodash'


export const useCartStore = defineStore('CartStore', () => {

    //State
    const items = ref([])

    //Getters
    const count = computed(()=> items.value.length)
    const isEmpty = computed(()=> count.value === 0 )
    const grouped = computed(()=>{ 
        const grouper = groupBy(items.value,(item)=> item.name)
        const sorted = Object.keys(grouper).sort()
        let inOrder = {}
        sorted.forEach((key)=> (inOrder[key] = grouper[key]))

        return inOrder
    })
    const total = computed(() => items.value.reduce((acumulador, elemento) => acumulador + elemento.price, 0))
    
    //Actions
    function addToCart(contador, item) {
        contador = parseInt(contador)
        for (let i = 0; i < contador; i++) {
            items.value.push(item)
        }
    }

    function $reset() {
        items.value = []
    }

    const clearItem = (itemName) => (items.value = items.value.filter(item => item.name !== itemName))

    const setItemCount = (item, count) => {
        clearItem(item.name);
        addToCart(count, item);
    }

    return { items, addToCart, count, isEmpty, grouped, $reset, total, clearItem, setItemCount }
})