<template>
    <div>
        <Login></Login>
      <h2>My Playlist</h2>
<!--         <h3 v-for="playlist in playlistStore.data" :key="playlist.id"></h3> -->
      <button @click="searchRoute">Go back to Search</button>
    </div>
  </template>
  
  <script setup>
  import { usePlaylistStore } from '@/stores/playlist';
  import { supabase } from '../../supabase';
  import { useStore } from '@/stores/counter';
  import { ref, onMounted } from 'vue';
  import router from '@/router';
  import Login from '@/components/Login.vue';
  
  const store = useStore()
  const session = ref(null)
  
  onMounted(() => {
    getPlaylist(store.current_id)
})

  function searchRoute() {
    router.push({path: 'search'})
  }

  async function getPlaylist(id) {
    const { data, error } = await supabase 
    .from('playlists')
    .select('track_id')
    .eq('id', `${id}`)
    if (error) {
        console.log(error)
    }
    else {
        console.log(data)
    }

  }
  </script>

  <style>
    .button {

    }

</style>