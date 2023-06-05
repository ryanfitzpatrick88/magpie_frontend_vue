<!-- https://pictogrammers.github.io/@mdi/font/2.0.46/ -->
<template>
    <v-card>
        <v-navigation-drawer v-if="isLoggedIn" v-model="drawer" class="app-drawer" temporary>
            <v-list v-model:opened="open">
                <v-img src="/magpie-icon-512.png" eager="eager" aspect-ratio="1" max-height="140"></v-img>
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
                <v-list-item prepend-icon="mdi-home" title="Home"></v-list-item>

                <v-list-group value="Account">
                    <template v-slot:activator="{ props }">
                        <v-list-item
                                v-bind="props"
                                prepend-icon="mdi-account-circle"
                                title="Account"
                        ></v-list-item>
                    </template>

                    <v-list-group value="Records">
                        <template v-slot:activator="{ props }">
                            <v-list-item
                                    v-bind="props"
                                    title="Records"
                            ></v-list-item>
                        </template>

                        <v-list-item
                                v-for="(record, i) in records"
                                :key="i"
                                :title="record.label"
                                :to="record.to"
                                :prepend-icon="record.icon"
                                :value="record.label"
                        ></v-list-item>
                    </v-list-group>

                    <v-list-group value="Tools">
                        <template v-slot:activator="{ props }">
                            <v-list-item
                                    v-bind="props"
                                    title="Tools"
                            ></v-list-item>
                        </template>

                        <v-list-item
                                v-for="(utility, i) in utilities"
                                :key="i"
                                :value="utility.label"
                                :title="utility.label"
                                :to="utility.to"
                                :prepend-icon="utility.icon"
                        ></v-list-item>
                    </v-list-group>
                </v-list-group>

                <v-list-group value="Admin">
                    <template v-slot:activator="{ props }">
                        <v-list-item
                                v-bind="props"
                                prepend-icon="mdi-key"
                                title="Admin"
                        ></v-list-item>
                    </template>

                    <v-list-item
                            v-for="(record, i) in admin"
                            :key="i"
                            :title="record.label"
                            :to="record.to"
                            :prepend-icon="record.icon"
                            :value="record.label"
                    ></v-list-item>
                </v-list-group>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar color="primary">
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
    </v-card>
</template>

<script>
import {ref, computed, watch} from 'vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';

export default {
    setup() {
        const store = useStore();
        const router = useRouter();
        const appName = ref('Magpie');
        const loggedInUser = ref(store.state.store.username); // Populate this with the logged in user's name
        const connectedDatabase = ref(store.state.store.database); // Populate this with the connected database name
        const version = ref(store.state.store.version);

        const isLoggedIn = computed(() => store.state.store.isLoggedIn);
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
                    store.dispatch('store/setLoggedIn', false);
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
        const open = ref(['Users']);

        const records = [
            {label: 'Budget', icon: 'mdi-wallet', to: '/budgets'},
            {label: 'Transactions', icon: 'mdi-swap-horizontal', to: '/transactions'},
            {label: 'Import Batches', icon: 'mdi-book-multiple', to: '/import-batches'},
            {label: 'Category', icon: 'mdi-format-list-bulleted', to: '/categories'},
            {label: 'Bank Accounts', icon: 'mdi-bank', to: '/bank-accounts'},
            {label: 'Merchants', icon: 'mdi-store', to: '/merchants'},
        ];

        const utilities = [
            {label: 'Import Transactions', icon: 'mdi-import', to: '/import-transactions'},
            {label: 'Duplicate Transactions', icon: 'mdi-content-duplicate', to: '/duplicate-transactions'},
            {label: 'Budget Overview', icon: 'mdi-chart-bar', to: '/budget-overview'},
        ];

        const admin = [
            {label: 'Users', icon: 'mdi-account', to: '/users'},
            {label: 'Accounts', icon: 'mdi-database', to: '/user-accounts'},
        ];

        // Watches
        watch(() => store.state.store.username, newVal => {
            loggedInUser.value = newVal;
        });

        watch(() => store.state.store.database, newVal => {
            connectedDatabase.value = newVal;
        });

        watch(() => store.state.store.version, newVal => {
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
            records,
            utilities,
            admin,
            open,
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

/deep/ .v-navigation-drawer.app-drawer {
    width: 256px !important;
}

.v-navigation-drawer .v-list-item {
    padding-left: 16px !important; /* adjust this value to change the padding */
}

.v-navigation-drawer .v-list-group__items {
    padding-left: 32px !important;
}
</style>


