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
});

</script>

<template>

<h1>Detall recepta</h1>

<h2>{{meal.strMeal }}</h2>
    <img :src="meal.strMealThumb" :alt="meal.strMeal" width="300px" />
    <p>{{ meal.strInstructions }}</p>

</template>
