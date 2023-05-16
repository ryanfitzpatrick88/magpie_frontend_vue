<template>
    <v-container>
        <v-btn color="primary" @click="$router.push('/user-accounts')">Back</v-btn>
        <router-link v-if="userAccount && userAccount.id" :to="`/user-accounts/edit/${userAccount.id}`">
            <v-btn color="secondary">Edit User Account</v-btn>
        </router-link>
        <v-card v-if="userAccount && userAccount.id">
            <v-card-title>
                <span class="text-h5">{{ userAccount.alias }}</span>
            </v-card-title>
            <v-card-text>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>ID</v-list-item-title>
                        <v-list-item-subtitle>{{ userAccount.id }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>Database</v-list-item-title>
                        <v-list-item-subtitle>{{ userAccount.database }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>Is Active</v-list-item-title>
                        <v-list-item-subtitle>{{ userAccount.is_active ? 'Yes' : 'No' }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import {reactive, toRefs, onMounted, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import axiosInstance from '../../axios.js'

export default {
    setup() {
        const route = useRoute();
        const router = useRouter();
        const state = reactive({
            userAccount: null
        });

        const fetchUserAccount = async () => {
            const userAccountId = parseInt(route.params.id);
            if (isNaN(userAccountId)) {
                return;
            }
            try {
                const response = await axiosInstance.get(`user-accounts/${userAccountId}`)
                state.userAccount = response.data;
            } catch (error) {
                console.error(`Failed to fetch user account ${userAccountId}:`, error);
            }
        }

        watch(route, fetchUserAccount);

        onMounted(fetchUserAccount);

        return {
            ...toRefs(state),
            fetchUserAccount,
            route,
            router
        }
    },
};
</script>

<style scoped>
/* Add any additional styling here */
</style>
