<template>
    <div>
      <PlaylistItem v-for="items in playlists" :Item = items></PlaylistItem>
    </div>
  </template>
  
  <script setup>
  import PlaylistItem from '@/assets/components/PlaylistItem.vue';
  import { useSpotifyStore } from '@/stores/spotifyStore.js'
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute()
  const store = useSpotifyStore()
  const playlists = ref(null)

async function getPlaylists(){    
    const playlist = await fetch("https://api.spotify.com/v1/me/playlists", {

    method: 'GET', headers: { Authorization: `Bearer ${store.token}` }
});
    playlists =  await playlist.json()
  }

async function getPlaylistItems(token){
    const items = await fetch(`https://api.spotify.com/v1/playlists/${route.params.id}/tracks`, {
        method: 'GET', headers: { Authorization: `Bearer ${token}` }
});
    return await items.json()
}


getPlaylists()
console.log(playlists)



  </script>
<style scoped>

</style>