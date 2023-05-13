<template>
    <v-app>
        <NavBar v-if="!simpleLayout"/>
        <AppDrawer v-else/>
    </v-app>
</template>

<script>
import {computed, watch, onMounted} from 'vue'
import {useStore} from 'vuex'
import {useTheme} from 'vuetify'
import NavBar from './components/NavBar.vue';
import AppDrawer from './components/AppDrawer.vue';
import axiosInstance from './axios.js'

export default {
    name: 'App',
    components: {
        NavBar,
        AppDrawer
    },
    setup() {
        const store = useStore()
        const theme = useTheme()
        const simpleLayout = computed(() => store.state.simpleLayout)

        watch(
            () => store.state.darkMode,
            (newVal) => {
                theme.global.name.value = newVal ? 'dark' : 'light'
            },
            {immediate: true}
        )

        onMounted(async () => {
            const accessToken = localStorage.getItem('access_token')
            const tokenType = localStorage.getItem('token_type')

            try {
                // await axiosInstance.get('auth/validate', {
                //     headers: {
                //         'Authorization': `${tokenType} ${accessToken}`
                //     }
                // })
                const response = await axiosInstance.get('app-info', {
                    headers: {
                        'Authorization': `${tokenType} ${accessToken}`
                    }
                })
                console.log(response.data)
                store.dispatch('setLoggedIn', true)
                store.dispatch('setUsername', response.data.username)
                store.dispatch('setDatabase', response.data.database)
                store.dispatch('setVersion', response.data.version)
            } catch (e) {
                console.log('bad validate')
                store.dispatch('refreshToken')
            }
        })

        return {
            simpleLayout
        }
    },
}
</script>
