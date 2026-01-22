<script setup>
import { ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useFetch } from '../composables/useFetch.js';


// Ruta actual
const route = useRoute();

// ID reactiu de la meal
const mealId = ref(parseInt(route.params.idMeal));

console.log(mealId.value)

const url =  ref(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId.value}`);

const { data, error, loading, fetchData } = useFetch(url);

// Propietat computada que es recalcula quan canvia data.value
const meal = computed(() => {
    return data.value && data.value.meals ? data.value.meals[0] : {};
    //return  data.value?.meals?.[0] || {};
});


// Vigilar canvis en l'ID de la ruta per actualitzar la recepta
watch(() => route.params.idMeal, (newId) => {
  mealId.value = parseInt(newId); // Actualitza l'ID reactiu
  url.value = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId.value}`;
  fetchData(); // Torna a buscar les dades

});

const ingredients = 20;

</script>

<template>

<h1>Detall recepta</h1>

<h2>{{meal.strMeal }}</h2>
    <img :src="meal.strMealThumb" :alt="meal.strMeal" width="300px" />
    <p>{{ meal.strInstructions }}</p>


    <div v-for="i in ingredients" :key="i">
      <div v-if="meal['strIngredient' + i] && meal['strIngredient' + i] !== ''">
      {{meal['strIngredient' + i]}}: {{ meal['strMeasure' + i] }}
      <!-- {{ meal[`strIngredient${i}`] }} : {{ meal[`strMeasure${i}`] }} -->
    </div>
    
    </div>

    <!-- Sense computed -->
    <!-- <div v-if="data && data.meals">
      {{ data?.meals?.[0].strMeal }}
    </div> -->

</template>
