<template>
    <v-container>
        <v-btn color="primary" @click="$router.push('/transactions')">Back</v-btn>
        <v-row v-if="transaction && transaction.id">
            <v-col cols="12" md="4">
                <v-card>
                    <v-card-title>
                        <span class="text-h5">{{ transaction.description }}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>Date</v-list-item-title>
                                <v-list-item-subtitle>{{ transaction.date }}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>Amount</v-list-item-title>
                                <v-list-item-subtitle>{{ transaction.amount }}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>Merchant</v-list-item-title>
                                <v-list-item-subtitle>{{ transaction.merchant_id }}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <v-card>
                    <v-card-title>
                        <span class="text-h5">Batch</span>
                    </v-card-title>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>ID</v-list-item-title>
                            <v-list-item-subtitle>{{ transaction.batch.id }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>Batch Imported At</v-list-item-title>
                            <v-list-item-subtitle>{{ transaction.batch.imported_at }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>Batch Source</v-list-item-title>
                            <v-list-item-subtitle>{{ transaction.batch.source }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>

                    <!--file_name-->
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>File Name</v-list-item-title>
                            <v-list-item-subtitle>{{ transaction.batch.file_name }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>

                    <!--user_id-->
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>User ID</v-list-item-title>
                            <v-list-item-subtitle>{{ transaction.batch.user_id }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <v-card-title>
                    <span class="text-h5">Bank Account</span>
                </v-card-title>

                <!-- account_name -->
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>Account Name</v-list-item-title>
                        <v-list-item-subtitle>{{ transaction.bank_account.account_name }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <!-- account_type -->
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>Account Type</v-list-item-title>
                        <v-list-item-subtitle>{{ transaction.bank_account.account_type }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <!-- bank_name -->
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>Bank Name</v-list-item-title>
                        <v-list-item-subtitle>{{ transaction.bank_account.bank_name }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <!-- currency -->
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>Currency</v-list-item-title>
                        <v-list-item-subtitle>{{ transaction.bank_account.currency }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <!-- bank_account_id -->
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>Bank Account ID</v-list-item-title>
                        <v-list-item-subtitle>{{ transaction.bank_account.id }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-col>
        </v-row>
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
            transaction: null
        });

        const fetchTransaction = async () => {
            const transactionId = parseInt(route.params.id);
            if (isNaN(transactionId)) {
                //console.error('Invalid transaction ID');
                return;
            }
            try {
                const response = await axiosInstance.get(`transactions/${transactionId}`)
                state.transaction = response.data;
                console.log('Transaction:', state.transaction)
            } catch (error) {
                console.error(`Failed to fetch transaction ${transactionId}:`, error);
            }
        }

        watch(route, fetchTransaction);

        onMounted(fetchTransaction);

        return {
            ...toRefs(state),
            fetchTransaction,
            route,
            router
        }
    },
};
</script>

<style scoped>
/* add style to make the text very stylish */
.v-card-title {
    font-size: 20px;
    font-weight: bold;
}
</style>
