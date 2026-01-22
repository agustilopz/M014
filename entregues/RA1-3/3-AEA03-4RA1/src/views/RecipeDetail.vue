<script setup>

import { recipes } from '../assets/recipes.js';

import { useRoute } from 'vue-router'



const route = useRoute()


const recipeId = parseInt(route.params.id)

const recipe = recipes.find(r => r.id === parseInt(recipeId))

console.log(recipe.nom)
console.log(recipe.descripcio)
console.log(recipe.ingredients)


</script>
<template>

    <div>
            <h2>{{ recipe.nom }}</h2>
            <img :src="recipe.url_imatge" :alt="recipe.nom" width="300px"/>
            <p>{{ recipe.descripcio }}</p>
            <h4>Ingredients:</h4>
            <ul>
                <li v-for="ingredient in recipe.ingredients" :key="ingredient">{{ ingredient }}</li>
            </ul>

            <ul>
                <li v-for="pas in recipe.pas_a_pas" :key="pas">{{ pas }}</li>
            </ul>
            <hr/>


    </div>
</template>