<template>
    <the-breadcrumb :crumbs="breadcrumbs"/>
    <the-header title="User Account List" subtitle=""/>
    <v-container class="user-list">
        <v-data-table
                v-if="$route.name === 'UserAccountList'"
                :headers="headers"
                :items="userAccounts"
                class="elevation-1"
        >
            <template v-slot:item.is_active="{ item }">
                <v-chip :color="getColor(item.raw.is_active)">
                    {{ item.raw.is_active ? 'Yes' : 'No' }}
                </v-chip>
            </template>
            <template v-slot:item.is_deleted="{ item }">
                <v-chip :color="getColor(item.raw.is_deleted)">
                    {{ item.raw.is_deleted ? 'Yes' : 'No' }}
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
import TheHeader from '../../components/TheHeader.vue';
import TheBreadcrumb from "../../components/TheBreadcrumb.vue";
import {useRoute} from "vue-router";

export default {
    components: {
        TheHeader,
        TheBreadcrumb,
    },
    setup() {
        const userAccounts = ref([]);
        const headers = ref([
            {title: 'ID', align: 'start', sortable: true, key: 'id'},
            {title: 'Database', align: 'end', key: 'database'},
            {title: 'Alias', align: 'end', key: 'alias'},
            {title: 'Is Active', align: 'end', key: 'is_active'},
            {title: 'Is Deleted', align: 'end', key: 'is_deleted'},
            {title: 'Actions', align: 'end', key: 'actions'},
        ]);

        const route = useRoute();
        const breadcrumbs = computed(() => {
            let crumbs = [
                {text: 'Home', to: {name: 'HomeView'}},
                {text: 'User Account List', to: {name: 'UserAccountList'}},
            ];
            if (route.name === 'UserAccountDetail') {
                crumbs.push({
                    text: route.params.id,
                    to: {name: 'UserAccountDetail', params: {id: route.params.id}}
                });
            } else if (route.name === 'UserAccountEdit') {
                crumbs.push({
                    text: "Edit",
                    to: {name: 'UserAccountDetail', params: {id: route.params.id}}
                }, {
                    text: route.params.id,
                    to: {name: 'UserAccountEdit', params: {id: route.params.id}}
                });
            }
            return crumbs;
        });

        const fetchUserAccounts = async () => {
            try {
                const response = await axiosInstance.get('user-accounts');
                userAccounts.value = response.data;
            } catch (error) {
                console.error('Failed to fetch user accounts:', error);
            }
        }

        const getColor = (is_active) => {
            return is_active ? 'green' : 'red';
        }

        const goToDetail = (router, id) => {
            router.push({name: 'UserAccountDetail', params: {id}});
        }

        onMounted(fetchUserAccounts);

        return {
            userAccounts,
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

