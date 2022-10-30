import { createApp } from 'vue'
import App from './App.vue'; 
import router from './router';  
// step 1 2 3 4 in index.js

// 5. Create and mount the root instance.
createApp(App)
.use(router)
.mount('#app')
