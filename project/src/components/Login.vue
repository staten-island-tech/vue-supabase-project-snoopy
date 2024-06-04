<template>
    <div>
    <input type="text"></input>
      <button @click="login" v-if="!store.logged">Sign In</button>
      <button @click="signOut" v-if="store.logged">Sign Out</button>
    </div>
  </template>
  
  <script setup>
  import { supabase } from '../../../supabaseClient';
  import { useStore } from '@/stores/counter.js';

  
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
  
  
  </script>
  