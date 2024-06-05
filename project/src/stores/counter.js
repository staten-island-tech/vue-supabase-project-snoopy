import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('store' ,async () => {

const logged = ref(false)
const token = ref(null)
const email = ref("")
const current_user = ref(null)
const user_playlist = ref([])

  return {logged, token, email, current_user, user_playlist}
})
