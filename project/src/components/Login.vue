<template>
    <div class="top" v-if="!store.logged">
    <label for="email">   Email:  </label>
    <input id="email" type="text" v-model="email">
    <label for="password">   Password:  </label>
    <input id="password" type="text" v-model="password">
    <button class="button" @click="signIn">Sign In</button>
    <button class="button" @click="signUp">Sign Up</button>
    </div>

    <div v-if="store.logged">
      <button class="button1" @click="signOut">Sign Out</button>
    </div>
</template>
  
<script setup>
  import { supabase } from '../../supabase';
  import { useStore } from '@/stores/counter';
  import { ref } from 'vue';
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
    alert(error.message)
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
    alert(error.message)
  }
  else {
    store.current_user = data
    store.logged = true
    getToken().then(token => {
      store.token = token
    })
    store.current_id = store.current_user.user.id   
    console.log(store.current_id)
    router.push({ path: 'playlist' })
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
.top {
  text-align: center;
  font-weight: bold;
}
.button {
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
  background-color: white;
  font-weight: 500;
  cursor: pointer;
  justify-content: space-around;
  padding: 0.2rem;
  text-align: center;
  margin-left:0.15%
}
.button1 {
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
  background-color: white;
  font-weight: 500;
  cursor: pointer;
  justify-content: space-around;
  padding: 0.2rem;
  text-align: center;
  margin-top: 2%;
  margin-left: 2%;
}
#email {
  color: rgb(64, 137, 141);
  margin-right: 1.5%;
}
#password {
  color: rgb(64, 137, 141);
  margin-right: 5%;
}
</style>

  