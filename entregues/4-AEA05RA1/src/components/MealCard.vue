<script setup>

import { RouterLink, RouterView } from 'vue-router';

defineProps({
    meal: Object
})


</script>


<template>

<div>
      <img width="150" :src="meal.strMealThumb" :alt="meal.strMeal">
      <h3>{{ meal.strMeal }}</h3>
      <p>{{ meal.strArea }} - {{ meal.strCategory }}</p>
      <RouterLink :to="`/meals/${meal.idMeal}`" >Recepta </RouterLink>
</div>



</template> 