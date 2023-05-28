<template>
    <the-breadcrumb :crumbs="breadcrumbs"/>
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
                <v-btn color="primary" @click="goToDetail($router, item.raw.id)">
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>
            </template>
        </v-data-table>
        <router-view/>
    </v-container>
</template>

<script>
import {ref, onMounted, computed} from 'vue'
import axiosInstance from '../../axios.js'
import TheHeader from '@/components/TheHeader.vue';
import TheBreadcrumb from "@/components/TheBreadcrumb.vue";
import {useRoute} from "vue-router";

export default {
    components: {
        TheHeader, // Register the component
        TheBreadcrumb,
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

        // The Breadcrumb implementation
        const route = useRoute();
        const breadcrumbs = computed(() => {
            let crumbs = [
                {text: 'Home', to: {name: 'HomeView'}},
                {text: 'User List', to: {name: 'UserList'}},
            ];
            if (route.name === 'UserDetail') {
                crumbs.push({
                    text: route.params.id,
                    to: {name: 'UserDetail', params: {id: route.params.id}}
                });
            } else if (route.name === 'UserEdit') {
                crumbs.push({
                    text: "Edit",
                    to: {name: 'UserDetail', params: {id: route.params.id}}
                }, {
                    text: route.params.id,
                    to: {name: 'UserEdit', params: {id: route.params.id}}
                });
            }
            return crumbs;
        });

        // The retrieve implementation
        const fetchUsers = async () => {
            try {
                const response = await axiosInstance.get('users');
                users.value = response.data;
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        }

        // styling implementation
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
            breadcrumbs,
            getColor,
            goToDetail
        }
    }
};
</script>

<style scoped>
/* your styles remain the same */
</style>

