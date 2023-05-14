<template>
    <div>
        <div class="top-section">
            <div class="date-picker-container">
                <p class="date-picker-label">Start Date</p>
                <date-picker v-model="startDate" :max="new Date()" :min="new Date('2023-05-01')"/>
            </div>
            <div class="date-picker-container">
                <p class="date-picker-label">End Date</p>
                <date-picker v-model="endDate" :max="new Date()" :min="new Date('2023-05-31')"/>
            </div>
            <v-btn color="primary" @click="analyzeDuplicates">Analyze Duplicates</v-btn>
        </div>
        <v-tabs v-model="activeTab">
            <v-tab value="transactions">Transactions</v-tab>
            <v-tab value="duplicates">Duplicates</v-tab>
        </v-tabs>
        <transaction-infinite-list v-show="activeTab === 'transactions'"
                                   :start-date="startDate"
                                   :end-date="endDate"
        ></transaction-infinite-list>
        <transaction-duplicate-list v-show="activeTab === 'duplicates'"
                                    ref="duplicateList"
                                    :duplicates="duplicates"
                                    :start-date="startDate"
                                    :end-date="endDate"
        ></transaction-duplicate-list>
    </div>
</template>

<script>
import TransactionInfiniteList from './TransactionInfiniteList.vue';
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
            analyzeDuplicates
        };
    },
};
</script>

<style scoped>
.top-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.date-picker-container {
    flex: 1;
    margin: 0 10px;
//border: 2px solid #3f51b5; /* Border color */ //border-radius: 5px; padding: 10px; font-size: 18px; /* Font size */ font-family: 'Roboto', sans-serif; /* Font family */
}

.date-picker-label {
    margin-bottom: 10px;
    font-weight: bold;
    color: #3f51b5; /* Font color */
}
</style>
