<template>
    <div class="rank">
      <PlaylistItems v-for="items in store.playlists" :Item = items></PlaylistItems>
    </div>
  </template>
  
  <script setup>
  import PlaylistItems from '@/components/PlaylistItems.vue';
  import { useSpotifyStore } from '@/stores/counter.js'
  import { useRoute } from 'vue-router';
  
  const route = useRoute()
  const store = useSpotifyStore()

  
async function getPlaylists(token){
    const playlist = await fetch("v1/me/playlists", {
        method: 'GET', headers: { Authorization: `Bearer ${token}` }
});
    store.playlists.value = await playlist.json()
}

async function getPlaylistItems(token){
    const items = await fetch(`https://api.spotify.com/v1/playlists/${route.params.id}/tracks`, {
        method: 'GET', headers: { Authorization: `Bearer ${token}` }
});
    return await items.json()
}

async function createPlaylist(tracksUri){
  const { id: user_id } = await store.fetchWebApi('v1/me', 'GET')

  const playlist = await store.fetchWebApi(
    `v1/users/${user_id}/playlists`, 'POST', {
      "name": "Playlist from Snoopy",
      "description": `Playlist created by ${user}`,
      "public": false
  })

  await fetchWebApi(
    `v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`,
    'POST'
  );

  return playlist;
}

  </script>
<style scoped>

</style>