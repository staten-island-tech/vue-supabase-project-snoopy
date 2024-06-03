import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSpotifyStore = defineStore('spotify' ,async () => {
  const playlists = ref('null')

async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

const tracksUri = ref([])
const logged = ref(false)

  return {playlists, tracksUri, logged, fetchWebApi}
})

