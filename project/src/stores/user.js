import { defineStore } from 'pinia'
import { supabase } from '../../supabase.js'

const { data, error } = await supabase.from('profiles').select()

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      data: data,
      error: error 
    }
}
})

