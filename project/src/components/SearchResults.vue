<template>
    <div>
      <h4>{{ result.name }} by {{ result.artists[0].name }}</h4>
      <h5> Spotify ID: {{ result.id }}</h5>
      <button class="button" @click="addToPlaylist(result)"> Add to Playlist </button>
    </div>
  </template>
  
  <script setup>
  import { usePlaylistStore } from '@/stores/playlist'
  import { useStore } from '@/stores/counter';
  import router from '@/router';
  import { ref } from 'vue'

  const playlistStore  = usePlaylistStore()
  const store = useStore()

  const props = defineProps({
    result: Object
  });

function addToPlaylist(result) {
    store.current_playlist.push(result.id)
    console.log(store.user_playlist)
    router.push({path: 'playlist'})
}

</script>


<style>
h4, h5 {
  color: black;
}
.button {
  background-color: white;
}

</style>
  