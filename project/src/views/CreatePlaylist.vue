<template>
  <Login v-if="!store.logged"></Login>
  <div v-if="store.logged">
    <div>
      <label for="search">Search for Tracks </label>
      <input type="text" id="search" v-model="search">
      <button @click="search_tracks">Submit</button>
    </div>
    <div>
      <h2>Search Results</h2>
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
  searchArr.value = result.tracks.items;
}

function inputChange() {
  return search.value.replaceAll(' ', '+')
}

async function fetchSearch(q) {
  return await fetchWebApi(`https://api.spotify.com/v1/search?q=${q}&type=track&limit=5`, "GET")
}

</script>

<style scoped>

</style>
