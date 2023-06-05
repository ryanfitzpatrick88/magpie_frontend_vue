<template>
    <v-container>
        <router-link v-if="budget && budget.id" :to="`/budgets/${budget.id}`">
            <v-btn color="secondary">Back</v-btn>
        </router-link>
        <v-form v-if="!isLoading" @submit.prevent="updateBudget">
            <v-card>
                <v-text-field label="Name" v-model="budget.name"></v-text-field>
                <v-select
                        :items="categories"
                        label="Category"
                        item-title="name"
                        item-value="id"
                        v-model="budget.category_id"
                        eager="eager"
                ></v-select>
                <v-text-field label="Amount" v-model="budget.amount"></v-text-field>
                <date-picker v-model="budget.start_date"
                             label="Start Date"
                             :popover="{ positionFixed: true}">
                    <template #default="{ inputValue, inputEvents }">
                        <v-text-field label="Start Date" :model-value="inputValue" v-on="inputEvents"></v-text-field>
                    </template>
                </date-picker>
                <date-picker v-model="budget.end_date"
                             label="Start Date"
                             :popover="{ positionFixed: true}">
                    <template #default="{ inputValue, inputEvents }">
                        <v-text-field label="End Date" :model-value="inputValue" v-on="inputEvents"></v-text-field>
                    </template>
                </date-picker>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" type="submit">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
        <div v-else>Loading...</div>
    </v-container>
</template>

<script>
import {reactive, toRefs, onMounted, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {DatePicker} from 'v-calendar'
import axiosInstance from '../../axios.js'

export default {
    components: {
        DatePicker,
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const state = reactive({
            budget: null,
            isLoading: true,
            categories: [],
        });

        const fetchBudget = async () => {
            state.isLoading = true;

            const budgetId = parseInt(route.params.id);
            if (isNaN(budgetId) || route.params.id === '0') {
                state.budget = {
                    name: '',
                    category_id: '',
                    amount: '',
                    start_date: '',
                    end_date: '',
                };
            } else {
                try {
                    const response = await axiosInstance.get(`budgets/${budgetId}`)
                    state.budget = response.data;
                } catch (error) {
                    console.error(`Failed to fetch budget ${budgetId}:`, error);
                }
            }

            state.isLoading = false;
        }

        const updateBudget = async () => {
            const budgetId = parseInt(route.params.id);
            if (isNaN(budgetId)) {
                return;
            }
            if (route.params.id === '0') {
                try {
                    state.budget.start_date = state.budget.start_date.toISOString().slice(0, 10);
                    state.budget.end_date = state.budget.end_date.toISOString().slice(0, 10);
                    await axiosInstance.post('budgets', state.budget);
                    router.push('/budgets');
                } catch (error) {
                    console.error(`Failed to create budget:`, error);
                }
            } else {
                try {
                    await axiosInstance.put(`budgets/${budgetId}`, state.budget);
                    router.push(`/budgets/${budgetId}`);
                } catch (error) {
                    console.error(`Failed to update budget ${budgetId}:`, error);
                }
            }
        }

        const fetchCategories = async () => {
            try {
                const response = await axiosInstance.get('categories');
                state.categories = response.data;
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        }

        watch(route, fetchBudget);

        onMounted(() => {
            fetchBudget()
            fetchCategories()
        });

        return {
            ...toRefs(state),
            fetchBudget,
            updateBudget,
            route,
            router
        }
    },
};
</script>

<style scoped>

</style>
