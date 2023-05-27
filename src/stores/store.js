import axiosInstance from '../axios.js';
//import axios from 'axios';

export default {
    namespaced: true,
    state: {
        isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false, // default value
        simpleLayout: localStorage.getItem('simple_layout') === 'true' || false, // default value
        darkMode: localStorage.getItem('dark_mode') === 'true' || false, // default value
        themeName: localStorage.getItem('theme_name') || 'light',
        username: '',
        database: '',
        version: '',
    },
    mutations: {
        SET_LOGGED_IN(state, value) {
            console.log("setLoggedIn action dispatched: ", value);
            state.isLoggedIn = value;
            localStorage.setItem('isLoggedIn', value);
        },
        SET_SIMPLE_LAYOUT(state, value) {
            console.log("setSimpleLayout action dispatched: ", value);
            state.simpleLayout = value;
            localStorage.setItem('simple_layout', value);
        },
        SET_DARK_MODE(state, value) {
            console.log("setDarkMode action dispatched: ", value);
            state.darkMode = value;
            localStorage.setItem('dark_mode', value);
        },
        SET_USERNAME(state, value) {
            console.log("setUsername action dispatched: ", value);
            state.username = value;
        },
        SET_DATABASE(state, value) {
            console.log("setDatabase action dispatched: ", value);
            state.database = value;
        },
        SET_VERSION(state, value) {
            console.log("setVersion action dispatched: ", value);
            state.version = value;
        },
        SET_THEME_NAME(state, value) {
            console.log("setVersion action dispatched: ", value);
            state.themeName = value;
            localStorage.setItem('theme_name', value);
        }
    },
    actions: {
        setLoggedIn({commit}, value) {
            console.log("SET_LOGGED_IN mutation committed: ", value);
            commit('SET_LOGGED_IN', value);
        },
        setSimpleLayout({commit}, value) {
            console.log("SET_SIMPLE_LAYOUT mutation committed: ", value);
            commit('SET_SIMPLE_LAYOUT', value);
        },
        setDarkMode({commit}, value) {
            console.log("SET_DARK_MODE mutation committed: ", value);
            commit('SET_DARK_MODE', value);
        },
        setUsername({commit}, value) {
            console.log("SET_USERNAME mutation committed: ", value);
            commit('SET_USERNAME', value);
        },
        setDatabase({commit}, value) {
            console.log("SET_DATABASE mutation committed: ", value);
            commit('SET_DATABASE', value);
        },
        setVersion({commit}, value) {
            console.log("SET_VERSION mutation committed: ", value);
            commit('SET_VERSION', value);
        },
        setThemeName({commit}, value) {
            console.log("SET_THEME_NAME mutation committed: ", value);
            commit('SET_THEME_NAME', value);
        },
        async refreshToken({commit}) {
            try {
                const refreshToken = localStorage.getItem('refresh_token');
                const response = await axiosInstance.post('/auth/refresh', {
                    "token": refreshToken
                });
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('token_type', response.data.token_type);
                commit('SET_LOGGED_IN', true);
            } catch (error) {
                console.log('Failed to refresh token:', error);
                commit('SET_LOGGED_IN', false);
            }
        }
    }
};
