<script setup>

defineProps({
  color: String
})

</script>

<template>
        <div class="plans">
            <div class="plan">
                <div class="description">
                    <span class="title"> {{color}} </span>
                </div>
            </div>
        </div>
</template>