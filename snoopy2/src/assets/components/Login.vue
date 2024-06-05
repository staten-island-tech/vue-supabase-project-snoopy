<template>
  <div>
    <button @click="login" v-if="!store.logged">Login to Spotify</button>
    <button @click="signOut" v-if="store.logged">Sign Out</button>
  </div>
</template>

<script setup>
import { supabase } from '../../../supabaseClient';
import { useSpotifyStore } from '@/stores/spotifyStore';

const store = useSpotifyStore();

async function auth() {
  supabase.auth.onAuthStateChange((event, session) => {
  if (session && session.provider_token) {
    window.localStorage.setItem('oauth_provider_token', session.provider_token);
    store.token = session.provider_token;
  }

  if (session && session.provider_refresh_token) {
    window.localStorage.setItem('oauth_provider_refresh_token', session.provider_refresh_token);
  }

  if (event === 'SIGNED_OUT') {
    window.localStorage.removeItem('oauth_provider_token');
    window.localStorage.removeItem('oauth_provider_refresh_token');
  }

  store.logged = !!session; 
  console.log(store.profile)
});

}

async function login() {
  await signInWithSpotify();
  auth()
}

async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error);
  }
}

async function signInWithSpotify() {
  await supabase.auth.signInWithOAuth({
    provider: 'spotify',
    options: {
      redirectTo: 'https://ndnsxwrgnyiaskhytsyr.supabase.co/auth/v1/callback'
    }
  });
}

</script>
