<template>
    <v-container>
        <v-row>
            <v-col v-if="duplicates">
                <v-list two-line subheader>
                    <v-list-item
                            v-for="(duplicate, index) in duplicates"
                            :key="`${index}-${duplicate.transactions.length}`"
                            @click="toggleShowDetails(duplicate)"
                    >
                        <v-list-item-content>
                            <v-list-item-title>{{ duplicate.description }}</v-list-item-title>
                            <v-list-item-subtitle>
                                {{ formatDate(duplicate.date) }} |
                                <span class="font-weight-bold">{{ formatCurrency(duplicate.amount) }}</span>
                            </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-icon>{{ duplicate.showDetails ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                        </v-list-item-action>
                        <v-expand-transition>
                            <v-list v-show="duplicate.showDetails" two-line subheader>
                                <v-list-item v-for="(transaction, tIndex) in duplicate.transactions" :key="tIndex">
                                    <v-list-item-content>
                                        <v-row>
                                            <v-col cols="3">
                                                <div class="caption grey--text">ID</div>
                                                {{ transaction.id }}
                                            </v-col>
                                            <v-col cols="3">
                                                <div class="caption grey--text">Description</div>
                                                {{ transaction.description }}
                                            </v-col>
                                            <v-col cols="3">
                                                <div class="caption grey--text">Date</div>
                                                {{ formatDate(transaction.date) }}
                                            </v-col>
                                            <v-col cols="3">
                                                <div class="caption grey--text">Amount</div>
                                                {{ formatCurrency(transaction.amount) }}
                                            </v-col>
                                        </v-row>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-expand-transition>
                    </v-list-item>
                </v-list>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {ref} from 'vue';
import axiosInstance from '@/axios';
import {format} from 'date-fns';

export default {
    props: {
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
    },
    setup(props) {
        const duplicates = ref([]);

        const fetchDuplicates = async () => {
            try {
                const formattedStartDate = format(props.startDate, 'yyyy-MM-dd');
                const formattedEndDate = format(props.endDate, 'yyyy-MM-dd');

                const response = await axiosInstance.get(
                    `transactions/getByDateRangeForDuplicates/${formattedStartDate}/${formattedEndDate}`
                );

                duplicates.value = response.data.map((duplicate) => ({...duplicate, showDetails: false}));
            } catch (error) {
                console.error('Failed to fetch duplicates:', error);
            }
        };

        const formatDate = (date) => {
            // Add your date formatting logic here
            return date;
        };

        const formatCurrency = (amount) => {
            // Add your currency formatting logic here
            return `$${amount.toFixed(2)}`;
        };

        const toggleShowDetails = (duplicate) => {
            duplicate.showDetails = !duplicate.showDetails;
        };


        return {
            duplicates,
            fetchDuplicates,
            formatDate,
            formatCurrency,
            toggleShowDetails,
        };
    },
};
</script>


