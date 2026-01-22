<script setup>
import { ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { recipes } from '../assets/recipes.js';

// Ruta actual
const route = useRoute();

// ID reactiu de la recepta
const recipeId = ref(parseInt(route.params.id));

// Recepta reactiva
const recipe = computed(() => {
  return recipes.find(r => r.id === recipeId.value); // Troba la recepta amb l'ID reactiu
});

// Vigilar canvis en l'ID de la ruta per actualitzar la recepta
watch(() => route.params.id, (newId) => {
  recipeId.value = parseInt(newId); // Actualitza l'ID reactiu
});
</script>

<template>
  <div v-if="recipe">
    <h2>{{ recipe.nom }}</h2>
    <img :src="recipe.url_imatge" :alt="recipe.nom" width="300px" />
    <p>{{ recipe.descripcio }}</p>

    <h4>Ingredients:</h4>
    <ul>
      <li v-for="ingredient in recipe.ingredients" :key="ingredient">{{ ingredient }}</li>
    </ul>

    <h4>Pas a pas:</h4>
    <ul>
      <li v-for="pas in recipe.pas_a_pas" :key="pas">{{ pas }}</li>
    </ul>

    <hr />
  </div>
  <div v-else>
    <p>No s'ha trobat la recepta.</p>
  </div>
</template>
