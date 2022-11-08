import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/index'
import store from './store/index'
import VueGravatar from "vue3-gravatar"
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-default.css';
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

const app = createApp(App)
app.use(VueGravatar)
app.use(VueLoading)
app.use(store)
app.use(router)
app.use(VueToast)
app.mount('#app')
