import { createApp } from 'vue'
import App from './App.vue'; 
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router';  
import Paginate from "vuejs-paginate-next";
// step 1 2 3 4 in index.js

// 5. Create and mount the root instance.

const app = createApp(App)
app.use(router)
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)
app.component("TablePagination", Paginate);
app.mount('#app')
