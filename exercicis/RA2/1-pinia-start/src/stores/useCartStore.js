import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const items = []
export const useCartStore = defineStore('cart', () => {

    return { items }
})