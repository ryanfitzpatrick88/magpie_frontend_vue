import {createApp} from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './stores';

import {library} from '@fortawesome/fontawesome-svg-core';
import {faHome, faSignInAlt, faWallet, faExchangeAlt, faListAlt, faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

library.add(faHome, faSignInAlt, faWallet, faExchangeAlt, faListAlt, faUser);

// Vuetify
import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import {VDataTable} from 'vuetify/labs/VDataTable'
import {VInfiniteScroll} from 'vuetify/labs/VInfiniteScroll'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as labsComponents from 'vuetify/labs/components'
import '@mdi/font/css/materialdesignicons.css'
import {light, dark, purple, red, blue, green, pink, millennial_pink, burnt_orange, black_cherry} from './themes'


const vuetify = createVuetify({
    labsComponents,
    components,
    directives,
    theme: {
        defaultTheme: store.state.store.themeName,
        themes: {
            light,
            dark,
            purple,
            red,
            blue,
            green,
            pink,
            millennial_pink,
            burnt_orange,
            black_cherry
        },
    },
})

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/v1', // Adjust this to your API base URL
});

// Add the Authorization header if an access token is available
axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

import TheHeader from './components/TheHeader.vue';
import TheSearch from './components/TheSearch.vue';
import DatePicker from 'vue3-datepicker'
import './registerServiceWorker'

const app = createApp(App);
app.config.globalProperties.$http = axiosInstance;
app.component('font-awesome-icon', FontAwesomeIcon);
app.component('v-data-table', VDataTable)
app.component('v-infinite-scroll', VInfiniteScroll)
app.component('TheHeader', TheHeader);
app.component('TheSearch', TheSearch);
app.component('DatePicker', DatePicker);
app.use(router);
app.use(store);
app.use(vuetify);
app.mount('#app');
