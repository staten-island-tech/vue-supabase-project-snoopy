import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSpotifyStore = defineStore('spotify' ,async () => {

const logged = ref(false)
const token = ref(null)

  return {logged, token}
})
