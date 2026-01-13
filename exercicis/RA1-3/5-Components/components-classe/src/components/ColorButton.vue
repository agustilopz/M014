<script setup>

// Definim les propietats que rep el component
const props= defineProps({
  color: String
})

// Definim els esdeveniments que pot emetre el component
const emit = defineEmits(['select-color'])

// Funció que s'executa quan es fa clic al botó
const handleClick = () => {
  emit('select-color', props.color)
}

</script>

<template>
        <div class="plans" @click="handleClick">
            <div class="plan">
                <div class="description">
                    <span class="title"> {{color}} </span>
                </div>
            </div>
        </div>
</template>