<template>
    <v-container>
        <router-link v-if="user && user.id" :to="`/users/${user.id}`">
            <v-btn color="secondary">Back</v-btn>
        </router-link>
        <v-form v-if="user && user.id" @submit.prevent="updateUser">
            <v-card>
                <v-card-title>
                    <span class="text-h5">{{ user.username }}</span>
                </v-card-title>
                <v-card-text>
                    <v-text-field label="ID" v-model="user.id" readonly></v-text-field>
                    <v-text-field label="Email" v-model="user.email"></v-text-field>
                    <v-checkbox label="Is Active" v-model="user.is_active"></v-checkbox>
                    <v-select
                            :items="userAccounts"
                            label="User Account"
                            item-title="combinedTitle"
                            item-value="id"
                            v-model="user.user_account_id"
                    ></v-select>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" type="submit">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-container>
</template>

<script>
import {reactive, toRefs, onMounted, watch, onBeforeUnmount} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import axiosInstance from '../../axios.js'

export default {
    setup() {
        let isUnmounted = false;

        onBeforeUnmount(() => {
            isUnmounted = true;
        });

        const route = useRoute();
        const router = useRouter();
        const state = reactive({
            user: null,
            userAccounts: [],
        });

        const fetchUser = async () => {
            const userId = parseInt(route.params.id);
            if (isNaN(userId)) {
                return;
            }
            try {
                const response = await axiosInstance.get(`users/${userId}`)
                console.log('User:', response.data)
                state.user = response.data;
            } catch (error) {
                console.error(`Failed to fetch user ${userId}:`, error);
            }
        }

        const fetchUserAccounts = async () => {
            try {
                const response = await axiosInstance.get('user-accounts')
                if (!isUnmounted) {
                    console.log('User accounts:', state.userAccounts)
                    var accounts_test = response.data.map(account => ({
                        ...account,
                        combinedTitle: `${account.alias} - ${account.database}`
                    }));
                    state.userAccounts = accounts_test;
                    console.log('User accounts test:', accounts_test)
                }
            } catch (error) {
                if (!isUnmounted) {
                    console.error('Failed to fetch user accounts:', error);
                }
            }
        }

        const updateUser = async () => {
            const userId = parseInt(route.params.id);
            if (isNaN(userId)) {
                return;
            }
            try {
                await axiosInstance.put(`users/${userId}`, state.user);
                console.log(`Updated user ${userId}`)
                router.push(`/users/${userId}`);
            } catch (error) {
                console.error(`Failed to update user ${userId}:`, error);
            }
        }

        watch(route, fetchUser);

        onMounted(async () => {
            fetchUserAccounts();
            fetchUser();
        });

        return {
            ...toRefs(state),
            fetchUser,
            fetchUserAccounts,
            updateUser,
            userAccounts: toRefs(state).userAccounts,
            route,
            router
        }
    },
};
</script>

<style scoped>
/* Add any additional styling here */
</style>
