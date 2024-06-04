<template>
    <div v-if="!store.logged">
    <h2>Logged in as {{Profile.display_name}}</h2>
    </div>
</template>

<script setup>
import { useSpotifyStore } from '@/stores/spotifyStore';
const store = useSpotifyStore()
const props = defineProps( {
    Profile: Object
})

</script>

<style scoped>

</style>