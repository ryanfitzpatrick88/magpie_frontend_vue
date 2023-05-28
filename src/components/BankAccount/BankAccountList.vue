<template>
    <the-breadcrumb :crumbs="breadcrumbs"/>
    <the-header title="Bank Account List" subtitle="" :actions="[
        {icon: 'mdi-plus', onClick: () => goToCreate($router)},
    ]"/>
    <v-container class="bank-account-list">
        <v-data-table
                v-if="$route.name === 'BankAccountList'"
                :headers="headers"
                :items="bankAccounts"
                class="elevation-1"
        >
            <template v-slot:item.currency="{ item }">
                <v-chip :color="getColor(item.raw.currency)">
                    {{ item.raw.currency }}
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
        TheHeader,
        TheBreadcrumb,
    },
    setup() {
        const bankAccounts = ref([]);
        const headers = ref([
            {title: 'ID', align: 'start', sortable: true, key: 'id'},
            {title: 'Name', align: 'end', key: 'account_name'},
            {title: 'Type', align: 'end', key: 'account_type'},
            {title: 'Bank', align: 'end', key: 'bank_name'},
            {title: 'Currency', align: 'end', key: 'currency'},
            {title: 'Actions', align: 'end', key: 'actions'},
        ]);

        const route = useRoute();
        const breadcrumbs = computed(() => {
            let crumbs = [
                {text: 'Home', to: {name: 'HomeView'}},
                {text: 'Bank Account List', to: {name: 'BankAccountList'}},
            ];
            if (route.name === 'BankAccountDetail') {
                crumbs.push({
                    text: route.params.id,
                    to: {name: 'BankAccountDetail', params: {id: route.params.id}}
                });
            } else if (route.name === 'BankAccountEdit') {
                crumbs.push({
                    text: "Edit",
                    to: {name: 'BankAccountDetail', params: {id: route.params.id}}
                }, {
                    text: route.params.id,
                    to: {name: 'BankAccountEdit', params: {id: route.params.id}}
                });
            }
            return crumbs;
        });

        const fetchBankAccounts = async () => {
            try {
                const response = await axiosInstance.get('bank-accounts');
                bankAccounts.value = response.data;
            } catch (error) {
                console.error('Failed to fetch bank accounts:', error);
            }
        }

        const goToCreate = (router) => {
            router.push({name: 'BankAccountEdit', params: {id: 0}});
        }

        const getColor = (is_active) => {
            return is_active ? 'green' : 'red';
        }

        const goToDetail = (router, id) => {
            router.push({name: 'BankAccountDetail', params: {id}});
        }

        onMounted(fetchBankAccounts);

        return {
            bankAccounts,
            headers,
            breadcrumbs,
            getColor,
            goToDetail,
            goToCreate
        }
    }
};
</script>

<style scoped>
/* your styles remain the same */
</style>

