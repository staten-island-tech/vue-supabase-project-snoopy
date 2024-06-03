import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import supabase from 'vue-3-supabase'

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');
app.use(supabase, {
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
    supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
    options: {},
});
