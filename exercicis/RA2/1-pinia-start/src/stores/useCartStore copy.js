import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {groupBy, groupby} from 'lodash';

export const useCartStore = defineStore('cart', () => {
// State
const items = ref([])

// Getters
const count = computed(() => items.value.length)

const isEmpty = computed(() => items.value.length === 0);

const grouped = computed(() => groupBy(items.value, (item) => item.name));

// Actions
function addToCart(count, item) {
  console.log("Adding to cart:", item, "Count:", parseInt(count));
  for (let i = 0; i < parseInt(count); i++) {
    items.value.push({ item })
  }
}
    return { items, count, isEmpty, grouped, addToCart }
})