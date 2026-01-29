import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import products from '@/data/products.json'

export const useProductStore = defineStore('product', () => {
    const productRef = ref([])

    function loadProducts() {
        productRef.value = products;
    }

    return { productRef, loadProducts }
})