<template>
    <v-container fluid>
        <div class="scroll-container">
            <v-card v-for="account in accounts" :key="account.id" class="account-card">
                <v-card-title>
                    <span class="text-h5">{{ account.name }}</span>
                </v-card-title>
                <v-card-text>
                    Balance: {{ account.balance }}
                </v-card-text>
            </v-card>
        </div>

        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>
                        <span class="text-h5">Budgets</span>
                    </v-card-title>
                    <v-card-text>
                        <v-data-table
                                :headers="headers"
                                :items="budgets"
                                :loading="loading"
                                class="elevation-1"
                        >
                            <template v-slot:item.actions="{ item }">
                                <v-icon @click="editBudget(item)">mdi-pencil</v-icon>
                                <v-icon @click="deleteBudget(item)">mdi-delete</v-icon>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {ref, onMounted} from 'vue';

export default {
    setup() {
        const accounts = ref([]);
        const budgets = ref([]);
        const headers = ref([
            {text: "Budget Name", value: "name"},
            {text: "Amount", value: "amount"},
            {text: "Used", value: "used"},
            {text: "Actions", value: "actions", sortable: false},
        ]);
        const loading = ref(false);

        const editBudget = (budget) => {
            // Implement this method to edit a budget
        };

        const deleteBudget = (budget) => {
            // Implement this method to delete a budget
        };

        const fetchAccounts = () => {
            // Fetch accounts from your API or backend
        };

        const fetchBudgets = () => {
            // Fetch budgets and their corresponding transactions from your API or backend
        };

        onMounted(() => {
            fetchAccounts();
            fetchBudgets();
        });

        return {
            accounts,
            budgets,
            headers,
            loading,
            editBudget,
            deleteBudget,
        };
    },
};
</script>

<style scoped>
.scroll-container {
    display: flex;
    overflow-x: auto;
    margin-bottom: 20px;
}

.account-card {
    flex: 0 0 auto;
    width: 300px;
    margin-right: 20px;
}
</style>

