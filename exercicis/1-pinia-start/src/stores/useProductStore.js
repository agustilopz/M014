import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import products from '@/data/products.json'

export const useProductStore = defineStore('product', () => {

  return { products }
})