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
                                            <v-col cols="2">
                                                <div class="caption grey--text">ID</div>
                                                {{ transaction.id }}
                                            </v-col>
                                            <v-col cols="2">
                                                <div class="caption grey--text">Description</div>
                                                {{ transaction.description }}
                                            </v-col>
                                            <v-col cols="2">
                                                <div class="caption grey--text">Date</div>
                                                {{ formatDate(transaction.date) }}
                                            </v-col>
                                            <v-col cols="2">
                                                <div class="caption grey--text">Amount</div>
                                                {{ formatCurrency(transaction.amount) }}
                                            </v-col>
                                            <v-col cols="2">
                                                <div class="caption grey--text">Actions</div>
                                                <v-btn color="primary" @click.stop="setAsMaster(transaction.id)">
                                                    <v-icon>mdi-lock</v-icon>
                                                </v-btn>
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
    <v-dialog v-model="dialogData.show" max-width="290">
        <v-card>
            <v-card-title class="headline">Confirmation</v-card-title>
            <v-card-text>
                Are you sure you want to set this transaction as master? This action cannot be undone.
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="confirmMaster">Confirm</v-btn>
                <v-btn color="red darken-1" text @click="cancelMaster">Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
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
        const dialogData = ref({
            show: false,
            masterId: null,
        });
        const setAsMaster = (masterId) => {
            // Show the confirmation dialog and keep track of the masterId
            dialogData.value = {
                show: true,
                masterId,
            };
        };

        const confirmMaster = async () => {
            const masterId = dialogData.value.masterId;
            try {
                // find the duplicate object that contains the master transaction
                const masterDuplicate = duplicates.value.find(
                    (duplicate) =>
                        duplicate.transactions.findIndex(
                            (transaction) => transaction.id === masterId
                        ) !== -1
                );

                if (!masterDuplicate) {
                    console.error(`Failed to find a duplicate containing transaction ${masterId}`);
                    return;
                }

                // get the IDs of the other transactions
                const duplicateIds = masterDuplicate.transactions
                    .filter((transaction) => transaction.id !== masterId)
                    .map((transaction) => transaction.id);

                // disable the duplicates on the server
                //await axiosInstance.post('transactions/disableDuplicates', {duplicateIds});
                console.log('Disabled duplicates:', duplicateIds);

                // finally, remove the masterDuplicate from the duplicates list
                duplicates.value = duplicates.value.filter(
                    (duplicate) => duplicate !== masterDuplicate
                );
            } catch (error) {
                console.error(`Failed to set transaction ${masterId} as master:`, error);
            }
            // Close the dialog
            dialogData.value.show = false;
        };

        const cancelMaster = () => {
            // Close the dialog without doing anything
            dialogData.value.show = false;
        };
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
            confirmMaster,
            cancelMaster,
            dialogData,
            fetchDuplicates,
            formatDate,
            formatCurrency,
            toggleShowDetails,
            setAsMaster,
        };
    },
};
</script>


