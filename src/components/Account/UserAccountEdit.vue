<template>
    <v-container>
        <router-link v-if="userAccount && userAccount.id" :to="`/user-accounts/${userAccount.id}`">
            <v-btn color="secondary">Back</v-btn>
        </router-link>
        <v-form v-if="userAccount && userAccount.id" @submit.prevent="updateUserAccount">
            <v-card>
                <v-card-title>
                    <span class="text-h5">{{ userAccount.alias }}</span>
                </v-card-title>
                <v-card-text>
                    <v-text-field label="Alias" v-model="userAccount.alias"></v-text-field>
                    <v-text-field label="ID" v-model="userAccount.id" readonly></v-text-field>
                    <v-text-field label="Database" v-model="userAccount.database" readonly></v-text-field>
                    <v-checkbox label="Is Active" v-model="userAccount.is_active"></v-checkbox>
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

        const updateUserAccount = async () => {
            const userAccountId = parseInt(route.params.id);
            if (isNaN(userAccountId)) {
                return;
            }
            try {
                await axiosInstance.put(`user-accounts/${userAccountId}`, state.userAccount);
                router.push(`/user-accounts/${userAccountId}`);
            } catch (error) {
                console.error(`Failed to update user account ${userAccountId}:`, error);
            }
        }

        watch(route, fetchUserAccount);

        onMounted(fetchUserAccount);

        return {
            ...toRefs(state),
            fetchUserAccount,
            updateUserAccount,
            route,
            router
        }
    },
};
</script>

<style scoped>
/* Add any additional styling here */
</style>
