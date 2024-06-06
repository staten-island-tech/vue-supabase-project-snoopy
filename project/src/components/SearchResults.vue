<template>
    <div>
      <h4>{{ result.name }} by {{ result.artists[0].name }}</h4>
      <button @click="addToPlaylist(result)">Add to Playlist</button>
    </div>
  </template>
  
  <script setup>
  import { useStore } from '@/stores/counter';
  import { supabase } from '../../supabase'
  import router from '@/router';
  import { ref } from 'vue'
  
  const store = useStore()

  const props = defineProps({
    result: Object
  });

async function addToPlaylist(result) {
    const { data, error } = await supabase 
    .from('playlists')
    .insert({id: store.current_id, track_id: result.id})
    .select()
    if (error) {
        console.log(error)
    }
    router.push({path: 'playlist'})
}

  </script>
  