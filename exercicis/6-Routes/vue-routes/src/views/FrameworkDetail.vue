<script setup>

import { useRoute } from 'vue-router'

import { ref } from 'vue'

const frameworks = [
    { id: 1, name: 'Vue.js', desc: 'Progressive Framework per construir interfícies web.' },
    { id: 2, name: 'React', desc: 'Biblioteca per crear interfícies d’usuari interactives.' },
    { id: 3, name: 'Angular', desc: 'Framework complet per aplicacions empresarials.' }
]

const route = useRoute()
const frameworkId = parseInt(route.params.id)
const framework = frameworks.find(fw => fw.id === parseInt(frameworkId))


</script>

<template>
    <h2>Framework Detail</h2>
    <div>
        <h3>{{ framework.name }}</h3>
        <p>{{ framework.desc }}</p>
        <a href="google.com">Veure versions</a>
    </div>
</template>