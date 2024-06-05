import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '../../supabaseClient'

export const useSpotifyStore = defineStore('spotify' ,async () => {

const logged = ref(false)
const token = ref(null)
const profile = ref(null)

  return {logged, token, profile}
})

export async function insertUserData(userData) {
  const { data, error } = await supabase
    .from('profiles')
    .insert([userData]);

  if (error) {
    console.error(error);
    return null
  }
  
  return data
}