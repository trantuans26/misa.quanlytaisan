import { createApp } from 'vue'
import App from './App.vue'; 
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router';  
// step 1 2 3 4 in index.js

// 5. Create and mount the root instance.

const app = createApp(App)
app.use(router)
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)
app.mount('#app')
