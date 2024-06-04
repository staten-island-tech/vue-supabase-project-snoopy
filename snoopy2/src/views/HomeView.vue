<template>
  <div>
    <h1>hi</h1>
    <Login></Login>
<!--     <UserProfile :Profile=profile></UserProfile> -->
  </div>
</template>

<script setup>
import Login from '@/assets/components/Login.vue';
import UserProfile from '@/assets/components/UserProfile.vue';
import { useSpotifyStore } from '@/stores/spotifyStore';
const store = useSpotifyStore()

async function getProfile(){    
    const profile = await fetch("https://api.spotify.com/v1/me", {
    method: 'GET', headers: { Authorization: `Bearer ${store.token}` }
});
    return await profile.json()
  }


console.log(getProfile())
</script>

<style scoped>

</style>