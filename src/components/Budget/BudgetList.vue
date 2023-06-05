<template>
    <the-breadcrumb :crumbs="breadcrumbs"/>
    <the-header title="Budget List" subtitle="" :actions="[
        {icon: 'mdi-plus', onClick: () => goToCreate($router)},
    ]"/>
    <v-container class="budget-list">
        <v-data-table
                v-if="$route.name === 'BudgetList'"
                :headers="headers"
                :items="budgets"
                class="elevation-1"
        >
            <template v-slot:item.category_id="{ item }">
                <v-chip :color="getColor(item.raw.category_id)">
                    {{ item.raw.category_id }}
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
        const budgets = ref([]);
        const headers = ref([
            {title: 'ID', align: 'start', sortable: true, key: 'id'},
            {title: 'Name', align: 'end', key: 'name'},
            {title: 'Category ID', align: 'end', key: 'category_id'},
            {title: 'Amount', align: 'end', key: 'amount'},
            {title: 'Start Date', align: 'end', key: 'start_date'},
            {title: 'End Date', align: 'end', key: 'end_date'},
            {title: 'Actions', align: 'end', key: 'actions'},
        ]);

        const route = useRoute();
        const breadcrumbs = computed(() => {
            let crumbs = [
                {text: 'Home', to: {name: 'HomeView'}},
                {text: 'Budget List', to: {name: 'BudgetList'}},
            ];
            if (route.name === 'BudgetDetail') {
                crumbs.push({
                    text: route.params.id,
                    to: {name: 'BudgetDetail', params: {id: route.params.id}}
                });
            } else if (route.name === 'BudgetEdit') {
                crumbs.push({
                    text: "Edit",
                    to: {name: 'BudgetDetail', params: {id: route.params.id}}
                }, {
                    text: route.params.id,
                    to: {name: 'BudgetEdit', params: {id: route.params.id}}
                });
            }
            return crumbs;
        });

        const fetchBudgets = async () => {
            try {
                const response = await axiosInstance.get('budgets');
                budgets.value = response.data;
            } catch (error) {
                console.error('Failed to fetch budgets:', error);
            }
        }

        const goToCreate = (router) => {
            router.push({name: 'BudgetEdit', params: {id: 0}});
        }

        const getColor = (category_id) => {
            // Here you can implement logic to determine color based on category id
            return 'green';
        }

        const goToDetail = (router, id) => {
            router.push({name: 'BudgetDetail', params: {id}});
        }

        onMounted(fetchBudgets);

        return {
            budgets,
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
