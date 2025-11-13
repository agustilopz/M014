<script setup>

import ColorButton from './components/ColorButton.vue'

import { ref } from 'vue'

const colors = ['Verd', 'Blau', 'Groc', 'Vermell']

// Variable reactiva per emmagatzemar el color seleccionat
const selectedColor = ref('Cap')

// Funció per gestionar l'esdeveniment 'select-color' emès pel component fill ColorButton
const handleColorSelected = (color) => {
  selectedColor.value = color
}

</script>

<template>
    <div class="content">
        <h1 class="title">Subscripcions disponibles</h1>
        <h2 class="subtitle">
            Disposem dels millor tes del món
        </h2>
        <h4 style="padding-left: 45px; font-weight: 400"> Últim color seleccionat: <strong style="font-weight: 600;">{{ selectedColor }}</strong></h4>
        <ColorButton v-for="(color, index) in colors" :key="index" :color="color" @select-color="handleColorSelected"/>
    </div>
</template>