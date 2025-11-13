<script lang="ts" setup>
const name ="v-on"

const handleClick = (missatge:string):void => {
    console.log(missatge)
};

const salutacio = () => {
    alert('Hola, benvingut!')
}
</script>

<template>
    <h1>Hola {{ name }}!</h1>
    <button v-on:click="handleClick('Botó 1')">Click aquí</button>
    <button @click="handleClick('Boto2')">Click aquí</button>

    <button @click="salutacio">Fes clic per saludar</button>
</template>
