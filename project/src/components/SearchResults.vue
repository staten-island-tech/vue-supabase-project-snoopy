<template>
    <div>
      <h4>{{ result.name }} by {{ result.artists[0].name }}</h4>
      <h5>Spotify ID: {{ result.id }}</h5>
      <button @click="addToPlaylist(result)">Add to Playlist</button>
    </div>
  </template>
  
  <script setup>
  import { useUserStore } from '@/stores/user'
  import { usePlaylistStore } from '@/stores/playlist'
  import router from '@/router';
  import { ref } from 'vue'

  const userStore = useUserStore()
  const playlistStore  = usePlaylistStore()
  const playlist = ref([])

  const props = defineProps({
    result: Object
  });

function addToPlaylist(result) {
    playlist.value.push(result.id)
    console.log(playlist.value)
    router.push({path: 'playlist'})
}

  </script>
  