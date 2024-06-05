<template>
    <div>
        <Login></Login>
      <h2>My Playlist</h2>
        <h3 v-for="playlist in playlistStore.data" :key="playlist.id"></h3>
      <button @click="searchRoute">Go back to Search</button>
    </div>
  </template>
  
  <script setup>
  import { usePlaylistStore } from '@/stores/playlist';
  import { supabase } from '../../supabase';
  import { useUserStore } from '@/stores/user';
  import { onMounted } from 'vue';
  import router from '@/router';
  import Login from '@/components/Login.vue';
  
  const playlistStore = usePlaylistStore()
  const userStore = useUserStore()
  
  onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session;
    const user = userStore.data.filter((user) => user.id === session.value.user.id)[0];
    user.playlists.forEach((track) => {
    playlist
})
})})

  function searchRoute() {
    router.push({path: 'search'})
  }

  </script>
  