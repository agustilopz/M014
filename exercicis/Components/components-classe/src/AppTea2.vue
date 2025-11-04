<script setup>
import ColorButton from './components/ColorButton.vue'

const colors = ['Verd', 'Blau', 'Groc', 'Vermell']

</script>

<template>
    <div class="content">
        <h1 class="title">Subscripcions disponibles</h1>
        <h2 class="subtitle">
            Disposem dels millor tes del món
        </h2>
        <ColorButton v-for="(color, index) in colors" :key="index" :color="color" />
    </div>
</template>