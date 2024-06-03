  <template>
    <div>
        <h1>Display your Spotify profile data</h1>
        <button @click="login">Login with Spotify</button>
    <section id="profile">
    <h2>Logged in as <span id="displayName"></span></h2>
    <span id="avatar"></span>
    <ul>
        <li>User ID: <span>{{ Profile.id }}</span></li>
        <li>Email: <span id="email"></span></li>
        <li>Spotify URI: <a id="uri" href="#"></a></li>
        <li>Link: <a id="url" href="#"></a></li>
        <li>Profile Image: <span id="imgUrl"></span></li>
    </ul>
    </section>
    </div>
</template>

<script setup>

import { useSpotifyStore } from '@/stores/counter'

const store = useSpotifyStore()

const props = defineProps( {
    Profile: Object
})

const clientId = "620e738985b043f8b0b38813d21c2a2e";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");



if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    const profile = await fetchProfile(store.token);
    console.log(profile)
    populateUI(profile);    
    const playlists = await getPlaylists(store.token);
    console.log(playlists)
    console.log(playlists.items[0].name);
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

  
function populateUI(profile) {
    document.getElementById("displayName").innerText = profile.display_name;
    if (profile.images[0]) {
        const profileImage = new Image(200, 200);
        profileImage.src = profile.images[0].url;
        document.getElementById("avatar").appendChild(profileImage);
        document.getElementById("imgUrl").innerText = profile.images[0].url;
    }
    Profile.id = profile.id.value;
    document.getElementById("email").innerText = profile.email;
    document.getElementById("uri").innerText = profile.uri;
    document.getElementById("uri").setAttribute("href", profile.external_urls.spotify);
    document.getElementById("url").innerText = profile.href;
    document.getElementById("url").setAttribute("href", profile.href);
}
</script>

<style scoped>

</style>