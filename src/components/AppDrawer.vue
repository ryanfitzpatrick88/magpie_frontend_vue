<template>
  <!-- https://pictogrammers.github.io/@mdi/font/2.0.46/ -->
    <v-app>
        <v-navigation-drawer v-model="drawer" temporary>
            <v-list-item>
                <v-list-item-content>
                    <div class="d-flex flex-column align-center">
                        <span class="text-h5">{{ appName }}</span>
                        <v-list-item-subtitle v-if="isLoggedIn">
                            Welcome, <span class="font-weight-bold">{{ loggedInUser }}</span>
                        </v-list-item-subtitle>
                        <v-list-item-subtitle v-if="isLoggedIn">
                            Connected To: <span class="font-weight-bold">{{ connectedDatabase }}</span>
                        </v-list-item-subtitle>
                        <v-list-item-subtitle>Build: <span class="font-weight-bold">{{ version }}</span>
                        </v-list-item-subtitle>
                    </div>
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <DrawerItem to="/" label="Home" icon="mdi-home" :show="!isLoggedIn"/>
            <DrawerItem to="/login" label="Login" icon="mdi-login" :show="!isLoggedIn"/>
            <DrawerItem to="/budget" label="Budget" icon="mdi-wallet" :show="isLoggedIn"/>
            <DrawerItem to="/transactions" label="Transaction" icon="mdi-swap-horizontal" :show="isLoggedIn"/>
            <DrawerItem to="/import-transactions" label="Import Transactions" icon="mdi-import" :show="isLoggedIn"/>
            <DrawerItem to="/import-batches" label="Import Batches" icon="mdi-book-multiple" :show="isLoggedIn"/>
            <DrawerItem to="/category" label="Category" icon="mdi-format-list-bulleted" :show="isLoggedIn"/>
            <DrawerItem to="/users" label="User" icon="mdi-account" :show="isLoggedIn"/>
        </v-navigation-drawer>

        <v-app-bar color="primary" dark>
            <v-btn icon @click="drawer = !drawer">
                <v-icon>mdi-menu</v-icon>
            </v-btn>
            <v-toolbar-title>Magpie</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu offset-y open-on-hover>
                <template #activator="{ on, props }">
                    <v-btn icon v-bind="props" v-on="on">
                        <v-icon>mdi-account-circle</v-icon>
                    </v-btn>
                </template>
                <v-list v-if="isLoggedIn">
                    <v-list-item v-for="(option, index) in options" :key="index" @click="option.action">
                        <v-list-item-title>{{ option.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
                <v-list v-if="!isLoggedIn">
                    <v-list-item v-for="(option, index) in anon_options" :key="index" @click="option.action">
                        <v-list-item-title>{{ option.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>

        <v-main>
            <v-container class="content">
                <router-view/>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import {ref, computed, watch} from 'vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';
import DrawerItem from './DrawerItem.vue';

export default {
    components: {
        DrawerItem
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        const appName = ref('Magpie');
        const loggedInUser = ref(store.state.username); // Populate this with the logged in user's name
        const connectedDatabase = ref(store.state.database); // Populate this with the connected database name
        const version = ref(store.state.version);

        const isLoggedIn = computed(() => store.state.isLoggedIn);
        const drawer = ref(false); // Initialize drawer state
        const options = [
            {
                title: 'Preferences', action: () => {
                    router.push('/preferences');
                }
            },
            {
                title: 'Logout', action: () => {
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('token_type');
                    localStorage.removeItem('refresh_token');
                    store.dispatch('setLoggedIn', false);
                    router.push('/login');
                }
            },
        ];

        const anon_options = [
            {
                title: 'Login', action: () => {
                    router.push('/login');
                }
            }
        ];

        // Watches
        watch(() => store.state.username, newVal => {
            loggedInUser.value = newVal;
        });

        watch(() => store.state.database, newVal => {
            connectedDatabase.value = newVal;
        });

        watch(() => store.state.version, newVal => {
            version.value = newVal;
        });

        return {
            isLoggedIn,
            drawer,
            options,
            anon_options,
            appName,
            loggedInUser,
            connectedDatabase,
            version,
        };
    },
};
</script>

<style scoped>
.text-h5 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
}

.font-weight-bold {
    font-weight: 600;
}

.d-flex {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-bottom: 1rem;
}
</style>


