import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('store' ,async () => {

const logged = ref(false)
const profile = ref(null)

  return {logged, profile}
})