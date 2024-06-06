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
  import { supabase } from '../../supabase'
  import router from '@/router';
  import { ref } from 'vue'

  const playlistStore  = usePlaylistStore()
  const store = useStore()

  const props = defineProps({
    result: Object
  });

async function addToPlaylist(result) {
    const { data, error } = await supabase 
    .from('playlists')
    .update({track_id: result.id})
    .eq('id', `${store.current_id}`, )
    .select()
    if (error) {
        console.log(error)
    }
    else {
        console.log(data)
    }
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
  