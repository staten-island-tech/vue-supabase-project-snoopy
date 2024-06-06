<template>
    <div>
        <Login></Login>
      <h2>My Playlist</h2>
        <PlaylistItems v-for="tracks in playlist" :key="track.track_id" :track="track"></PlaylistItems>
      <button @click="searchRoute">Go back to Search</button>
    </div>
  </template>
  
  <script setup>
  import { supabase } from '../../supabase';
  import { useStore } from '@/stores/counter';
  import { ref, onMounted } from 'vue';
  import router from '@/router';
  import Login from '@/components/Login.vue';
  import PlaylistItems from '@/components/PlaylistItems.vue'
  
  const store = useStore()
  const session = ref(null)
  const playlist = ref([])

  onMounted(async () => {
    await getPlaylist(store.current_id)
})

  function searchRoute() {
    router.push({path: 'search'})
  }

  async function getPlaylist(id) {
    const { data, error } = await supabase 
    .from('playlists')
    .select('track_id')
    .eq('id', `${id}`)
    console.log(Array.from(data))
    console.log(injectTracks(Array.from(data)))

  }

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

    async function getTrack(track) {
        return await fetchWebApi(`https://api.spotify.com/v1/${track.track_id}`, "GET")
    }

async function injectTracks(playlist) {
  const tracks = []
  for (const track of playlist) {
    const trackData = await getTrack(track);
    tracks.push(trackData)
  }
  return tracks
}

  </script>

  <style>
    .button {

    }

</style>