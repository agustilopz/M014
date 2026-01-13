<script setup>
/**
 * Versió fent servir el watch per detectar canvis en els paràmetres de la ruta
 */
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'


const frameworks = ref([
    { id: 1, name: 'Vue.js', desc: 'Progressive Framework per construir interfícies web.' },
    { id: 2, name: 'React', desc: 'Biblioteca per crear interfícies d’usuari interactives.' },
    { id: 3, name: 'Angular', desc: 'Framework complet per aplicacions empresarials.' }
])

const framework = ref(null)

const route = useRoute()
//const frameworkId = parseInt(route.params.id)
//const framework = frameworks.find(fw => fw.id === parseInt(frameworkId))

const carregarFramework = (id) => {
    framework.value = frameworks.value.find(fw => fw.id === parseInt(id))
}

carregarFramework(route.params.id)

watch(
    () => route.params.id,
    (newId) => {
        carregarFramework(newId)
    }
)
</script>

<template>
    <h2>Framework Detail</h2>
    <div>
        <h3>{{ framework.name }}</h3>
        <p>{{ framework.desc }}</p>
        <a href="google.com">Veure versions</a>
    </div>
</template>