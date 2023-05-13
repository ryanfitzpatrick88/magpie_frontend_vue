<template>
    <v-container>
        <v-btn color="primary" @click="$router.push('/users')">Back</v-btn>
        <router-link v-if="user && user.id" :to="`/users/edit/${user.id}`">
            <v-btn color="secondary">Edit User</v-btn>
        </router-link>
        <v-card v-if="user && user.id">
            <v-card-title>
                <span class="text-h5">{{ user.username }}</span>
            </v-card-title>
            <v-card-text>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>ID</v-list-item-title>
                        <v-list-item-subtitle>{{ user.id }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>Email</v-list-item-title>
                        <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>Is Active</v-list-item-title>
                        <v-list-item-subtitle>{{ user.is_active ? 'Yes' : 'No' }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>Database</v-list-item-title>
                        <v-list-item-subtitle>{{ user.database }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-card-text>
        </v-card>
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
                //console.error('Invalid user ID');
                return;
            }
            try {
                const response = await axiosInstance.get(`users/${userId}`)
                state.user = response.data;
            } catch (error) {
                console.error(`Failed to fetch user ${userId}:`, error);
            }
        }

        watch(route, fetchUser);

        onMounted(fetchUser);

        return {
            ...toRefs(state),
            fetchUser,
            route,
            router
        }
    },
};
</script>

<style scoped>
/* Add any additional styling here */
</style>
