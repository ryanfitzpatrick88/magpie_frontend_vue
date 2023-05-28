<template>
    <v-container class="transaction-list">
        <the-header title="Transaction List" subtitle=""/>
        <the-search
                :items="transactions"
                :properties="[ 'description', 'amount', 'date']"
                :filters="[
            { name: 'Positive Amounts', filter: item => item.amount > 0 },
            { name: 'Negative Amounts', filter: item => item.amount < 0 },
            {
              name: 'Current Week',
              filter: item => {
                const itemDate = new Date(item.date);
                const now = new Date();
                const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
                const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
                return itemDate >= startOfWeek && itemDate <= endOfWeek;
              }
            },
            {
              name: 'Last Week',
              filter: item => {
                const itemDate = new Date(item.date);
                const now = new Date();
                const startOfLastWeek = new Date(now.setDate(now.getDate() - now.getDay() - 7));
                const endOfLastWeek = new Date(now.setDate(now.getDate() - now.getDay() - 1));
                return itemDate >= startOfLastWeek && itemDate <= endOfLastWeek;
              }
            }
        ]">
            <template #default="{ items }">
                <v-data-table
                        v-if="$route.name === 'TransactionList'"
                        :headers="headers"
                        :items="items"
                        class="elevation-1"
                >
                    <template v-slot:item.date="{ item }">
                        {{ item.raw.date }}
                    </template>
                    <template v-slot:item.description="{ item }">
                        {{ item.raw.description }}
                    </template>
                    <template v-slot:item.amount="{ item }">
                        <v-chip class="amount-chip" :color="getAmountColor(item.raw.amount)">
                            {{ formatAmount(item.raw.amount) }}
                        </v-chip>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-btn color="primary" @click="goToDetail($router, item.raw.id)">
                            <v-icon>mdi-magnify</v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
            </template>
        </the-search>
        <router-view/>
    </v-container>
</template>

<script>
import {ref, onMounted} from 'vue'
import axiosInstance from '../../axios.js'
import TheHeader from '@/components/TheHeader.vue';
import TheSearch from '@/components/TheSearch.vue';

export default {
    components: {
        TheHeader,
        TheSearch
    },
    setup() {
        const transactions = ref([]);

        const headers = ref([
            {title: 'Date', align: 'start', sortable: true, key: 'date'},
            {title: 'Description', align: 'end', key: 'description'},
            {title: 'Amount', align: 'end', key: 'amount'},
            {title: 'Actions', align: 'end', key: 'actions'},
        ]);

        const fetchTransactions = async () => {
            try {
                const response = await axiosInstance.get('transactions');
                transactions.value = response.data;
            } catch (error) {
                console.error('Failed to fetch transactions:', error);
            }
        }

        const goToDetail = (router, id) => {
            router.push({name: 'TransactionDetail', params: {id}});
        }

        const getAmountColor = (amount) => {
            return amount >= 0 ? 'green' : 'red';
        }

        const formatAmount = (amount) => {
            // Format amount based on your requirement (e.g., add currency symbol, decimal places, etc.)
            return `$${amount.toFixed(2)}`;
        }

        onMounted(fetchTransactions);

        return {
            transactions,
            headers,
            goToDetail,
            formatAmount,
            getAmountColor
        }
    }
};
</script>

<style scoped>
.amount-chip {
    color: white;
    font-weight: bold;
    font-size: 16px;
    padding: 6px 12px;
    border-radius: 20px;
}

.amount-chip.green {
    background-color: green;
}

.amount-chip.red {
    background-color: red;
}
</style>