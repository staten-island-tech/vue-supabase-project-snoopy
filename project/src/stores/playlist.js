import { defineStore } from 'pinia'
import { supabase } from '../../supabase.js'

export const usePlaylistStore = defineStore('playlists', {
  state: () => ({
    data: null,
    error: null
  }),

  actions: {
    async fetchData() {
      try {
        const { data, error } = await supabase.from('playlists').select();
        if (error) {
          throw error;
        }
        this.data = data;
      } catch (error) {
        this.error = error;
      }
    }
  }
})