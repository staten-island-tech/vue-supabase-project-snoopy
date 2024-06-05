<template>
    <Login v-if="!store.logged"></Login>
    <div v-if="store.logged">
      <div>
        <h2>Create New Playlist</h2>
        <label for="search">Search for Tracks </label>
        <input type="text" id="search" v-model="search">
        <button @click="search_tracks">Submit</button>
      </div>
      <div>
        <input type="text" placeholder="Playlist Name">
      </div>
    </div>
  </template>
  
  <script setup>
  import Login from '@/components/Login.vue';
  import { useStore } from '@/stores/counter';
  import { ref } from 'vue';
  
  const store = useStore();
  const search = ref("");
  const searchArr = ref([]);
  const searchRes = ref([])
  
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
    const query = inputChange();
    const result = await fetchSearch(query)
    if (result.tracks && result.tracks.items) {
      searchArr.value = result.tracks.items
    }
    for (let i=0; i<searchArr.value.length; i++) {
        searchRes.value.push(searchArr.value[i].name + ' by ' + searchArr.value[i].artists[0].name)
    }
    console.log(searchRes.value) 
  }
  
  function inputChange() {
    return search.value.replaceAll(' ', '+')
  }
  
  async function fetchSearch(q) {
    const endpoint = `https://api.spotify.com/v1/search?q=${q}&type=track&limit=5`
    return await fetchWebApi(endpoint, "GET")
  }
  </script>
  
  <style scoped>

  </style>
  