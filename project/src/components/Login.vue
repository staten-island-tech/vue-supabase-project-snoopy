<template>
    <div v-if="!store.logged">
      <label for="email">Email  </label>
    <input id="email" type="text" v-model="email"></input>
    <label for="password">Password  </label>
    <input id="password" type="text"v-model="password"></input>
      <button @click="signIn">Sign In</button>
      <button @click="signUp">Sign Up</button>
  
    </div>    
    <button @click="signOut" v-if="store.logged">Sign Out</button>
  </template>
  
  <script setup>
  import { supabase } from '../../supabase';
  import { useStore } from '@/stores/counter';
  import { ref } from 'vue';
  const store = useStore()

  const email = ref("")
  const password = ref("")

  async function signUp() {
    let { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,    
  })
  if (error) {
    console.log(error)
  }
  else {
    signIn()
    store.logged = true
  }
  }

  async function signIn() {
    let { data, error } = await supabase.auth.signInWithPassword({
  email: email.value,
  password: password.value,
  })  
  if (error) {
    console.log(error)
  }
  else {
    store.logged = true
  }
}

  async function signOut() {
    supabase.auth.signOut();
    store.logged = false
  }
  
  
  </script>
  