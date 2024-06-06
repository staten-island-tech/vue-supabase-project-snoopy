import { defineStore } from 'pinia'
import { supabase } from '../../supabase.js'

const { data, error } = await supabase.from('playlists').select()

export const usePlaylistStore = defineStore('playlists', {
    state: () => {
      return {
        data: data,
        error: error 
      }
    }
  })