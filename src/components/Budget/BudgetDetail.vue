<template>
    <v-container>
        <v-btn color="primary" @click="$router.push('/budgets')">Back</v-btn>
        <router-link v-if="budget && budget.id" :to="`/budgets/edit/${budget.id}`">
            <v-btn color="secondary">Edit Budget</v-btn>
        </router-link>
        <v-card v-if="budget && budget.id">
            <v-card-title>
                <span class="text-h5">{{ budget.name }}</span>
            </v-card-title>
            <v-card-text>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>ID</v-list-item-title>
                        <v-list-item-subtitle>{{ budget.id }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>Category ID</v-list-item-title>
                        <v-list-item-subtitle>{{ budget.category_id }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>Amount</v-list-item-title>
                        <v-list-item-subtitle>{{ budget.amount }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>Start Date</v-list-item-title>
                        <v-list-item-subtitle>{{ budget.start_date }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>End Date</v-list-item-title>
                        <v-list-item-subtitle>{{ budget.end_date }}</v-list-item-subtitle>
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
            budget: null
        });

        const fetchBudget = async () => {
            const budgetId = parseInt(route.params.id);
            if (isNaN(budgetId)) {
                return;
            }
            try {
                const response = await axiosInstance.get(`budgets/${budgetId}`)
                state.budget = response.data;
            } catch (error) {
                console.error(`Failed to fetch budget ${budgetId}:`, error);
            }
        }

        watch(route, fetchBudget);

        onMounted(fetchBudget);

        return {
            ...toRefs(state),
            fetchBudget,
            route,
            router
        }
    },
};
</script>

<style scoped>
/* Add any additional styling here */
</style>
