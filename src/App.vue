<template>
    <v-app>
        <NavBar v-if="!simpleLayout"/>
        <AppDrawer v-else/>
    </v-app>
</template>

<script>
import {computed, watch, onMounted} from 'vue'
import {useRouter} from "vue-router";
import {useStore} from 'vuex'
import {useTheme} from 'vuetify'
import NavBar from './components/NavBar.vue';
import AppDrawer from './components/AppDrawer.vue';
import axiosInstance from './axios.js'
import initializeInterceptor from './axios.js'

export default {
    name: 'App',
    components: {
        NavBar,
        AppDrawer
    },
    setup() {
        const store = useStore()
        const router = useRouter()
        const theme = useTheme()

        initializeInterceptor(store, router);

        const simpleLayout = computed(() => store.state.simpleLayout)

        watch(
            () => store.state.themeName,
            (newVal) => {
                theme.global.name.value = newVal
            },
            {immediate: true}
        )

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
                store.dispatch('setLoggedIn', true)
                store.dispatch('setUsername', response.data.username)
                store.dispatch('setDatabase', response.data.alias)
                store.dispatch('setVersion', response.data.version)
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
