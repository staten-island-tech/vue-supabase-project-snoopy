  <template>
    <div v-if="store.logged">
        <h1>Display your Spotify profile data</h1>
    <h2>Logged in as {{Profile.display_name}}</h2>
    <span id="avatar"></span>
    <ul>
        <li>User ID: {{ Profile.id }} </li>
        <li>Email: {{ Profile.email }}</li>
        <li>Spotify URI: <a id="uri" href="#"></a></li>
        <li>Link: <a id="url" href="#"></a></li>
        <li>Profile Image: <span id="imgUrl"></span></li>
    </ul>
    </div>
</template>

<script setup>

import { useSpotifyStore } from '@/stores/counter'
import { onMounted } from 'vue';

const store = useSpotifyStore()

const props = defineProps( {
    Profile: Object
})

const params = new URLSearchParams(window.location.search);
const code = params.get("code");



if (!code) {
    store.redirectToAuthCodeFlow(store.clientId);
} else {
    const profile = await fetchProfile(store.token);
    console.log(profile)
    const playlists = await getPlaylists(store.token);
    console.log(playlists)
    for (let i=0; i<playlists.items.length; i++) {
        console.log(playlists.items[i].name)
    }
}

  async function fetchProfile(token) {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}

  
</script>

<style scoped>

</style>