<template>
    <div>
      <p>{{ result.name }} by {{ result.artists[0].name }}</p>
      <button class="button5" @click="addToPlaylist(result)">Add to Playlist</button>
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


<style>
.button5 {
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
  background-color: rgb(219, 236, 255);
  font-weight: 500;
  cursor: pointer;
  justify-content: space-around;
  padding: 0.2rem;
  text-align: center;
  margin-left: 2%;
}
p {
  margin-left: 2%;
  margin-top: 2.5%;
  color: rgb(33, 107, 192);
}
</style>
  