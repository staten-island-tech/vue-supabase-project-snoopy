import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('store' ,async () => {

const logged = ref(false)
const token = ref(null)
const email = ref("")

  return {logged, token, email}
})
