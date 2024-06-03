<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'
import { supabase } from './supabase'

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })
})
</script>

<template>
  <div class="container" style="padding: 50px 0 100px 0">
    <Account v-if="session" :session="session" />
    <Auth v-else />
  </div>
</template>



