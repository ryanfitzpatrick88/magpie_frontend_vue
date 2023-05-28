<template>
    <v-app>
        <TheMessage/>
        <TheNotification/>
        <NavBar v-if="!simpleLayout"/>
        <AppDrawer v-else/>
    </v-app>
</template>

<script>
import {computed, watch, onMounted} from 'vue'
// {useRouter} from "vue-router";
import {useStore} from 'vuex'
import {useTheme} from 'vuetify'
import NavBar from './components/NavBar.vue';
import AppDrawer from './components/AppDrawer.vue';
import axiosInstance from './axios.js'
//import initializeInterceptor from './axios.js'
import TheMessage from "./components/TheMessage.vue";
import TheNotification from "@/components/TheNotification.vue";

export default {
    name: 'App',
    components: {
        TheNotification,
        TheMessage,
        NavBar,
        AppDrawer
    },
    setup() {
        const store = useStore()
        //const router = useRouter()
        const theme = useTheme()

        //initializeInterceptor(store, router);

        const simpleLayout = computed(() => store.state.store.simpleLayout)

        watch(
            () => store.state.store.themeName,
            (newVal) => {
                if (newVal) {
                    console.log(newVal + ' ' + theme.global.name.value)
                    theme.global.name.value = newVal
                }
            },
            {immediate: true}
        );

        onMounted(async () => {
            const accessToken = localStorage.getItem('access_token')
            const tokenType = localStorage.getItem('token_type')

            try {
                const response = await axiosInstance.get('app-info', {
                    headers: {
                        'Authorization': `${tokenType} ${accessToken}`
                    }
                })
                console.log(response.data)
                await store.dispatch('store/setLoggedIn', true)
                await store.dispatch('store/setUsername', response.data.username)
                await store.dispatch('store/setDatabase', response.data.alias)
                await store.dispatch('store/setVersion', response.data.version)
            } catch (e) {
                console.log('bad validate')
                // store.dispatch('setLoggedIn', false);
                // router.push({name: 'LoginView'});
                //store.dispatch('refreshToken')
            }
        })

        return {
            simpleLayout
        }
    },
}
</script>
