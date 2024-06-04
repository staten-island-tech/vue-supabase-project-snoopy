<template>
    <div v-if="!store.logged">
    <h2>Logged in as {{Profile.display_name}}</h2>
    <span id="avatar"></span>
    <ul>
        <li>User ID: {{ Profile.id }} </li>
        <li>Email: {{ Profile.email }}</li>
        <li>Spotify URI: <a id="uri" href="#"></a></li>
        <li>Link: <a id="url" href="#"></a></li>
        <li>Profile Image: <span id="imgUrl"></span></li>
    </ul>
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