import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '../../supabase'

export const useStore = defineStore('store' ,async () => {

const logged = ref(false)
const token = ref(null)

  return {logged, token}
})
