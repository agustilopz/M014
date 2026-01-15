import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import products from '@/data/products.json'

export const useProductStore = defineStore('product', () => {
  const productRef = ref([])
  // const productRef = ref(products)
  
  function fill() {
    productRef.value = products;
  }
  
  return { productRef, fill }
})