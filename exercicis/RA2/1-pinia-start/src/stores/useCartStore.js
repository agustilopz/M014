import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { groupBy } from 'lodash'


export const useCartStore = defineStore('CartStore', () => {

    //State
    const items = ref([])

    //Getters
    const count = computed(()=> items.value.length)
    
    const isEmpty = computed(()=> count.value === 0 )

    const grouped = computed(()=> groupBy(items.value,(item)=> item.name))

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

    return { items, addToCart, count, isEmpty, grouped, $reset }
})