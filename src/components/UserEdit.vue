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
                    <v-text-field label="Database" v-model="user.database"></v-text-field>
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
import axiosInstance from '../axios.js'

export default {
    setup() {
        const route = useRoute();
        const router = useRouter();
        const state = reactive({
            user: null
        });

        const fetchUser = async () => {
            const userId = parseInt(route.params.id);
            if (isNaN(userId)) {
                return;
            }
            try {
                const response = await axiosInstance.get(`users/${userId}`)
                state.user = response.data;
            } catch (error) {
                console.error(`Failed to fetch user ${userId}:`, error);
            }
        }

        const updateUser = async () => {
            const userId = parseInt(route.params.id);
            if (isNaN(userId)) {
                return;
            }
            try {
                await axiosInstance.put(`users/${userId}`, state.user);
                router.push(`/users/${userId}`);
            } catch (error) {
                console.error(`Failed to update user ${userId}:`, error);
            }
        }

        watch(route, fetchUser);

        onMounted(fetchUser);

        return {
            ...toRefs(state),
            fetchUser,
            updateUser,
            route,
            router
        }
    },
};
</script>

<style scoped>
/* Add any additional styling here */
</style>
