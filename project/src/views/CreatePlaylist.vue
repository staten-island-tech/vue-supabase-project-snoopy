<template>
    <Login v-if="store.logged"></Login>
    <div v-if="store.logged">
        <div>
        <h2>Create New Playlist</h2>
        <label for="search">Search for Tracks </label>
        <input type="text" id="search" v-model="searchQuery">
        <button @click="search_tracks">Submit</button>
    </div>
    <div>
        <input type="text" placeholder="Playlist Name"></input>
    </div>
    </div>

</template>

<script setup>
import Login from '@/components/Login.vue';
import { useStore } from '@/stores/counter';
import { ref } from 'vue';

const store = useStore()
const searchQuery = ref("")

async function search_tracks() {
    console.log(searchQuery._rawValue)
}

</script>

<style scoped>

</style>