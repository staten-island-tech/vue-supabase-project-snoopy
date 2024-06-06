<template>
  <Login v-if="store.logged"></Login>
  <button @click="playlistRoute">Go back to Playlists</button>
  <div v-if="store.logged">
    <div>
      <label for="search">Search for Tracks </label>
      <input type="text" id="search" v-model="search">
      <button @click="search_tracks">Submit</button>
    </div>
    <div>
      <div v-for="result in searchArr" :key="result.id">
        <SearchResults :result="result"></SearchResults>
      </div>
    </div>
  </div>
</template>

<script setup>
import Login from '@/components/Login.vue'
import SearchResults from '@/components/SearchResults.vue'
import { useStore } from '@/stores/counter'
import { ref } from 'vue'
import router from '@/router';

const store = useStore()
const search = ref("")
const searchArr = ref([])


async function fetchWebApi(endpoint, method, body = null) {
  const res = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${store.token}`,
    },
    method,
    body: body ? JSON.stringify(body) : null
  });
  return await res.json();
}

async function search_tracks() {
  const query = inputChange()
  const result = await fetchSearch(query)
  searchArr.value = result.tracks.items
/*   console.log(searchArr) */
}

function inputChange() {
  return search.value.replaceAll(' ', '+')
}

async function fetchSearch(q) {
  return await fetchWebApi(`https://api.spotify.com/v1/search?q=${q}&type=track&limit=5`, "GET")
}

function playlistRoute() {
    router.push({path: 'playlist'})
  }

</script>

<style scoped>

</style>
