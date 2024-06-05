<script setup>
import { onMounted, ref, toRefs } from 'vue'
import { supabase } from '@/lib/supabaseClient'

const props = defineProps(['session'])
const { session } = toRefs(props)

const loading = ref(true)
const username = ref('')

onMounted(() => {
  getProfile()
})

async function signOut() {
    try {
        loading.value = true
        let { error } = await supabase.auth.signOut()
        if (error) throw error
    } catch (error) {
        alert(error.message)
    } finally {
        loading.value = false
    }
}

</script>


<template>
    <form>
      <div>
        <label for="email">Email</label>
        <input id="email" type="text" :value="session.user.email" disabled />
      </div>
      <div>
        <label for="username">Name</label>
        <input id="username" type="text" v-model="username" />
      </div>
  
      <div>
        <input
          type="submit"
          :value="loading ? 'Loading ...' : 'Update'"
          :disabled="loading"
        />
      </div>
  
      <div>
        <button @click="signOut" :disabled="loading"> Sign Out </button>
      </div>
    </form>
  </template>