<template>
  <div>
    <button @click="login" v-if="!store.logged">Login to Spotify</button>
    <button @click="signOut" v-if="store.logged">Sign Out</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '../../supabaseClient';
import { useSpotifyStore } from '@/stores/counter';

const store = useSpotifyStore();
const clientId = "620e738985b043f8b0b38813d21c2a2e";

supabase.auth.onAuthStateChange((event, session) => {
  if (session && session.provider_token) {
    window.localStorage.setItem('oauth_provider_token', session.provider_token);
  }

  if (session && session.provider_refresh_token) {
    window.localStorage.setItem('oauth_provider_refresh_token', session.provider_refresh_token);
  }

  if (event === 'SIGNED_OUT') {
    window.localStorage.removeItem('oauth_provider_token');
    window.localStorage.removeItem('oauth_provider_refresh_token');
  }

  store.logged = !!session;
});

async function login() {
  await signInWithSpotify();
}

async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error);
  }
}

async function signInWithSpotify() {
  await supabase.auth.signInWithOAuth({
    provider: 'spotify',
    options: {
      redirectTo: 'https://nlmzmftbvewtmrocvgln.supabase.co/auth/v1/callback'
    }
  });

  const session = supabase.auth.session;
  if (session) {
    const token = session.provider_token;
    if (token) {
      const profile = await fetchProfile(token);
      console.log('Spotify Profile:', profile);
      const playlists = await getPlaylists(token);
      console.log('Playlists:', playlists);
      store.playlists = playlists;
    }
  }
}

async function fetchProfile(token) {
  const result = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  return await result.json();
}

async function getPlaylists(token) {
  const result = await fetch("https://api.spotify.com/v1/me/playlists", {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  return await result.json();
}

onMounted(() => {
  const session = supabase.auth.session;
  store.logged = !!session;
});
</script>
