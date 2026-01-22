<script setup>

import { recipes } from '../assets/recipes.js';

import { RouterLink, RouterView } from 'vue-router'


console.log(recipes)
</script>
<template>

    <h1>Receptes</h1>
    <h3>Explora una varietat de receptes delicioses</h3>
    <div>

        <div v-for="recipe in recipes" :key="recipe.id" >

            <h2>{{ recipe.nom }}</h2>
            <img :src="recipe.url_imatge" :alt="recipe.nom" width="300px"/>
            <p>{{ recipe.descripcio }}</p>

            <RouterLink :to="`/recipes/${recipe.id}`">Veure detall</RouterLink>

            <hr/>
              
        </div>


    </div>
         <RouterView :key="$route.fullPath"/> <!--Per forçar la recàrrega del component fill quan canvia la ruta  -->

</template>