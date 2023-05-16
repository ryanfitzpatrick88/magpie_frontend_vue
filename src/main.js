import {createApp} from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';

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

const purple = {
    dark: false,
    colors: {
        background: '#FFFFFF',
        surface: '#FFFFFF',
        primary: '#6200EE',
        'primary-darken-1': '#3700B3',
        secondary: '#03DAC6',
        'secondary-darken-1': '#018786',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
    },
}

const light = {
    dark: false,
    colors: {
        background: '#F2F5F8',
        surface: '#F2F5F8',
        primary: '#3B82F6',
        'primary-darken-1': '#2563EB',
        secondary: '#10B981',
        'secondary-darken-1': '#059669',
        error: '#EF4444',
        'on-background': '#1F2937',
        'on-surface': '#1F2937',
        'on-primary': '#FFFFFF',
        'on-secondary': '#FFFFFF',
        'on-error': '#FFFFFF',
    },
};

const burnt_orange = {
    dark: false,
    colors: {
        background: '#FFFFFF',
        surface: '#FFFFFF',
        primary: '#F97316',
        'primary-darken-1': '#EA580C',
        secondary: '#F59E0B',
        'secondary-darken-1': '#D97706',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00'
    }
}

const black_cherry = {
    dark: true,
    colors: {
        background: '#1F2937',
        surface: '#1F2937',
        primary: '#EF4444',
        'primary-darken-1': '#B91C1C',
        secondary: '#F59E0B',
        'secondary-darken-1': '#D97706',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00'

    }
}

const red = {
    dark: false,
    colors: {
        background: '#FFFFFF',
        surface: '#FFFFFF',
        primary: '#EF4444',
        'primary-darken-1': '#B91C1C',
        secondary: '#F59E0B',
        'secondary-darken-1': '#D97706',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
    }
}

const blue = {
    dark: false,
    colors: {
        background: '#FFFFFF',
        surface: '#FFFFFF',
        primary: '#3B82F6',
        'primary-darken-1': '#2563EB',
        secondary: '#10B981',
        'secondary-darken-1': '#059669',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
    }
}

const green = {
    dark: false,
    colors: {
        background: '#FFFFFF',
        surface: '#FFFFFF',
        primary: '#10B981',
        'primary-darken-1': '#059669',
        secondary: '#3B82F6',
        'secondary-darken-1': '#2563EB',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',

    }
}

const pink = {
    dark: false,
    colors: {
        background: '#FFFFFF',
        surface: '#FFFFFF',
        primary: '#EC4899',
        'primary-darken-1': '#BE185D',
        secondary: '#3B82F6',
        'secondary-darken-1': '#2563EB',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
    }
}

const millennial_pink = {
    dark: false,
    colors: {
        background: '#FFFFFF',
        surface: '#FFFFFF',
        primary: '#FFC0CB',
        'primary-darken-1': '#FF69B4',
        secondary: '#FFB6C1',
        'secondary-darken-1': '#FF69B4',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
    }
}

const vuetify = createVuetify({
    labsComponents,
    components,
    directives,
    theme: {
        defaultTheme: store.state.themeName,
        themes: {
            light,
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
