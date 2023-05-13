<template>
    <the-header title="User List" subtitle=""/>
    <v-container class="user-list">
        <v-data-table
                v-if="$route.name === 'UserList'"
                :headers="headers"
                :items="users"
                class="elevation-1"
        >
            <template v-slot:item.is_active="{ item }">
                <v-chip :color="getColor(item.raw.is_active)">
                    {{ item.raw.is_active ? 'Yes' : 'No' }}
                </v-chip>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-btn color="primary" @click="goToDetail($router, item.raw.id)">Detail</v-btn>
            </template>
        </v-data-table>
        <router-view/>
    </v-container>
</template>

<script>
import {ref, onMounted} from 'vue'
import axiosInstance from '../axios.js'
import TheHeader from '@/components/TheHeader.vue';

export default {
    components: {
        TheHeader, // Register the component
    },
    setup() {
        const users = ref([]);
        const headers = ref([
            {title: 'ID', align: 'start', sortable: true, key: 'id'},
            {title: 'Username', align: 'end', key: 'username'},
            {title: 'Email', align: 'end', key: 'email'},
            {title: 'Is Active', align: 'end', key: 'is_active'},
            {title: 'Actions', align: 'end', key: 'actions'},
        ]);

        const fetchUsers = async () => {
            try {
                const response = await axiosInstance.get('/users');
                users.value = response.data;
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        }

        const getColor = (is_active) => {
            return is_active ? 'green' : 'red';
        }

        const goToDetail = (router, id) => {
            router.push({name: 'UserDetail', params: {id}});
        }

        onMounted(fetchUsers);

        return {
            users,
            headers,
            getColor,
            goToDetail,
            TheHeader
        }
    }
};
</script>

<style scoped>
/* your styles remain the same */
</style>

