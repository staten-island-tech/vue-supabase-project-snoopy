<template>
  <div>
    <h1>hi</h1>
    <Login></Login>
<!--     <UserProfile :Profile="store.profile"></UserProfile> -->
    
  </div>
</template>

<script setup>
import Login from '@/assets/components/Login.vue';
import UserProfile from '@/assets/components/UserProfile.vue';
import { useSpotifyStore } from '@/stores/spotifyStore';

const store = useSpotifyStore()

</script>

<style scoped>

</style>