import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import {store} from "./store/store";

import axios from 'axios'
import VueAxios from 'vue-axios'

import VueSweetalert2 from 'vue-sweetalert2';
import VueProgressiveImage from 'vue-progressive-image'
import VueLazyload from 'vue-lazyload'

import {helper} from "@/bootstrap/helper";
Vue.prototype.$helper = helper

import './bootstrap/ml'
import './bootstrap/bootstrap'
import './bootstrap/apiServiesRoutes'
import Argon from "./plugins/argon-kit";

import './registerServiceWorker'

Vue.config.productionTip = false;

Vue.use(Argon);
Vue.use(VueSweetalert2);
Vue.use(VueLazyload)
Vue.use(VueProgressiveImage)
Vue.use(VueAxios, axios)
import VueSocialauth from 'vue-social-auth'

Vue.use(VueSocialauth, {
    providers: {
        twitter: {
            url: 'http://zashzash.com/back_end/api/user/get-twitter-token',
            clientId: 'pQsmeUZTOOeuKkDCeSas7jXYE',
            redirectUri: 'https://localhost:8080/zashtest2/auth/twitter/callback', // Your client app URL
            responseParams: {
                oauth_token: 'oauth_token',
            }
        }
    }
})

new Vue({
    store: store,
    router,
    render: h => h(App)
}).$mount("#app");
