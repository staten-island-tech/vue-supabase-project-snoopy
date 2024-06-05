<template>
    <div class="bar" v-if="!store.logged">
    <label id="email" for="email"> Email </label>
    <input type="text" v-model="email"></input>
    <label id="password" for="password">  Password </label>
    <input  type="text"v-model="password"></input>
      <button class="button" @click="signIn"> Sign In </button>
      <button class="button" @click="signUp"> Sign Up </button>
  
    </div>
    <div v-if="store.logged">
      <button @click="signOut"> Sign Out </button>
    </div>

  </template>
  
  <script setup>
  import { supabase } from '../../supabase';
  import { useStore } from '@/stores/counter';
  import { ref, onMounted } from 'vue';
  import router from '@/router';
  const store = useStore()

  const email = ref("")
  const password = ref("")
  
  function getToken() {
  const client_id = '620e738985b043f8b0b38813d21c2a2e';
  const client_secret = '43d980aa741647848f4dac5d8da212ca';

  const authOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
    },
    body: 'grant_type=client_credentials'
  };

  return fetch('https://accounts.spotify.com/api/token', authOptions)
    .then(response => response.json())
    .then(data => {
      const token = data.access_token
      return token
    })
    .catch(error => console.error(error))
}

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
    getToken().then(token => {
      store.token = token
    })
    router.push({ path: 'search' })
  }
}

  async function signOut() {
    supabase.auth.signOut();
    store.logged = false
    store.token = null
    router.push({ path: '/' })
  }

</script>


<style>
.bar {
}
#email {
  color: white;
}
#password {
  color: white;
}
.button {
  background-color: white;
}
</style>
  