<template>
    <div>
        <Login></Login>      
    <button class= "button2" @click="searchRoute">Go Back to Search</button>
      <h2>My Playlist:</h2> 
      <h3> Search for songs to add to or remove from your playlist! </h3>     

      <div v-for="track in playlistData" :key="track.track_id">
        <p>{{ track.name }} by {{ track.artists[0].name }}</p>
        <button class="button6" @click="removeFromPlaylist(track)">Remove from Playlist</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { supabase } from '../../supabase';
  import { useStore } from '@/stores/counter';
  import { ref, onMounted } from 'vue';
  import router from '@/router';
  import Login from '@/components/Login.vue';
  
  const store = useStore()
  const playlistData = ref([])

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
    injectTracks(Array.from(data))
  }


async function getPkey(track) {
    const { data, error } = await supabase 
    .from('playlists')
    .select('pkey')
    .eq('id', store.current_id)
    .eq('track_id', track.id)
    return data[0].pkey
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
    return await fetchWebApi(`https://api.spotify.com/v1/tracks/${track.track_id}`, "GET")
}

async function injectTracks(playlist) {
  const tracks = []
  for (const track of playlist) {
    const trackData = await getTrack(track);
    tracks.push(trackData)
  }    
  playlistData.value = tracks
}


async function removeFromPlaylist(track) {
    const pkey = await getPkey(track)
    console.log(pkey)
    const { data, error } = await supabase 
    .from('playlists')
    .delete()
    .eq('pkey', pkey)

    await getPlaylist(store.current_id)
}

  </script>

<style>
.button2 {
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
  background-color: white;
  font-weight: 500;
  cursor: pointer;
  padding: 0.2rem;
  text-align: center;
  align-items: center;
  margin-top: 0.3%;
  margin-left: 2%;
}
.button6 {
  text-align: center;
  margin-left: 2%;
  margin-bottom: 1.5%;
  border-radius: 4px;
  background-color: rgb(219, 236, 255);
}
h2 {
  align-items: center;
  text-align: center;
  margin-top: 3.5%;
  text-decoration: underline;
  font-size: 3rem;
}
h3 {
  align-items: center;
  text-align: center;
  margin-top: -1%;  
  margin-bottom: 2%;
}
p {
  margin-left: 2%;
  color: rgb(33, 107, 192);
}
</style>