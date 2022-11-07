import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import Toaster from '@meforma/vue-toaster';
import VueCookies from 'vue-cookies';
import VueGravatar from "vue3-gravatar";
import MDialogPlugin from 'vue-m-dialog';
import VueLoading from 'vue-loading-overlay';
import VueTheMask from 'vue-the-mask'; 
import 'vue-loading-overlay/dist/vue-loading.css';
import 'vue-m-dialog/dist/style.css';

createApp(App)
.use(store)
.use(router)
.use(VueCookies)
.use(VueGravatar)
.use(MDialogPlugin)
.use(VueLoading)
.use(VueTheMask)
.use(Toaster).mount('#app');
