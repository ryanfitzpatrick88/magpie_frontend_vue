<template>
    <div class="container">
        <div class="actions-section">
            <div class="date-picker-container">
                <p class="date-picker-label">Start Date</p>
                <date-picker v-model="startDate" :max="new Date()" :min="new Date('2023-05-01')"/>
            </div>
            <div class="date-picker-container">
                <p class="date-picker-label">End Date</p>
                <date-picker v-model="endDate" :max="new Date()" :min="new Date('2023-05-31')"/>
            </div>
            <v-btn block color="primary" v-if="activeTab === 'duplicates'" @click="analyzeDuplicates">Find Duplicates
            </v-btn>
            <v-btn block color="primary" v-if="activeTab === 'transactions'" @click="fixSelected">Fix Duplicates
            </v-btn>
            <v-btn block color="primary" v-if="activeTab === 'transactions'" @click="refresh">Refresh
            </v-btn>
        </div>

        <div class="tabs-section">
            <v-tabs v-model="activeTab">
                <v-tab value="transactions">Transactions</v-tab>
                <v-tab value="duplicates">Duplicates</v-tab>
            </v-tabs>
            <transaction-infinite-list v-if="activeTab === 'transactions'"
                                       ref="transactionList"
                                       :start-date="startDate"
                                       :end-date="endDate"
            ></transaction-infinite-list>
            <transaction-duplicate-list v-if="activeTab === 'duplicates'"
                                        ref="duplicateList"
                                        :duplicates="duplicates"
                                        :start-date="startDate"
                                        :end-date="endDate"
            ></transaction-duplicate-list>
        </div>

    </div>
</template>

<script>
import TransactionInfiniteList from '../Transaction/TransactionInfiniteList.vue';
import TransactionDuplicateList from './TransactionDuplicateList.vue';
import {ref, watch} from 'vue';

export default {
    components: {
        TransactionInfiniteList,
        TransactionDuplicateList,
    },
    setup() {
        const activeTab = ref('transactions');
        const duplicates = ref([]);
        const duplicateList = ref(null);
        const transactionList = ref(null);

        const getPreviousSunday = (date) => {
            const day = date.getDay();
            const diff = date.getDate() - day;
            return new Date(date.setDate(diff));
        }

        const getNextSunday = (date) => {
            const day = date.getDay();
            const diff = date.getDate() - day + 7;  // next Sunday
            return new Date(date.setDate(diff));
        }

        const analyzeDuplicates = () => {
            duplicateList.value.fetchDuplicates();
        };

        const fixSelected = () => {
            transactionList.value.fixSelected();
        };

        const refresh = () => {
            transactionList.value.refresh();
        };

        const currentDate = new Date();
        const startDate = ref(getPreviousSunday(currentDate));
        const endDate = ref(getNextSunday(currentDate));

        watch(activeTab, (newValue) => {
            console.log(`activeTab changed to ${newValue}`);
        });

        return {
            activeTab,
            duplicates,
            startDate,
            endDate,
            duplicateList,
            refresh,
            fixSelected,
            analyzeDuplicates
        };
    },
};
</script>


<style scoped>
/* Your existing styles here... */

.container {
    display: flex;
    width: 96%;
    margin: 2% auto;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.actions-section {
    width: 25%;
    padding: 20px;
    border-right: 1px solid #ccc;
}

.tabs-section {
    width: 75%;
    padding: 20px;
}

.date-picker-container {
    margin-bottom: 10px;
}

.date-picker-label {
    margin-bottom: 10px;
    font-weight: bold;
//color: #3f51b5; /* Font color */
}
</style>
