import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
    const items = ref([])

function addToCart(count, product) {
  console.log("Adding to cart:", product, "Count:", parseInt(count));
  for (let i = 0; i < parseInt(count); i++) {
    items.value.push({ product })
  }
}
    return { items, addToCart }
})