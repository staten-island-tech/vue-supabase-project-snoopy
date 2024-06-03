<template>
    <div>
        <button @click="signInWithSpotify" v-if="!store.logged">Login to Spotify</button>
        <button @click="signOut" v-if="store.logged">Sign Out</button>
    </div>
</template>

<script setup>
import { useSpotifyStore } from '@/stores/counter';
let store = useSpotifyStore()

async function signInWithSpotify() {
const data = await supabase.auth.signInWithOAuth({
  provider: 'spotify',
  options: {
    redirectTo: 'https://nlmzmftbvewtmrocvgln.supabase.co/auth/v1/callback',
  },
})
}

async function signOut() {
  const error = await supabase.auth.signOut()
}

</script>

<style scoped>

</style>