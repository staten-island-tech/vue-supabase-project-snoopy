<template>
    <div>
        <h3>{{ track.name }} by {{ track.artists[0].name }}</h3>
    </div>
</template>

<script setup>
    const props = defineProps({
        track:Object
    })
</script>

<style scoped>

</style>