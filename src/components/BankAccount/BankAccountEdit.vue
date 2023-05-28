<template>
    <v-container>
        <router-link v-if="bankAccount && bankAccount.id" :to="`/bank-accounts/${bankAccount.id}`">
            <v-btn color="secondary">Back</v-btn>
        </router-link>
        <v-form v-if="!isLoading" @submit.prevent="updateBankAccount">
            <v-card>
                <v-text-field label="Account Name" v-model="bankAccount.account_name"></v-text-field>
                <v-select
                        :items="accountTypes"
                        label="Account Type"
                        item-title="combinedTitle"
                        item-value="value"
                        v-model="bankAccount.account_type"
                ></v-select>
                <v-text-field label="Bank Name" v-model="bankAccount.bank_name"></v-text-field>
                <v-text-field label="Currency" v-model="bankAccount.currency"></v-text-field>
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
import axiosInstance from '../../axios.js'

export default {
    setup() {
        const route = useRoute();
        const router = useRouter();
        const state = reactive({
            bankAccount: null,
            isLoading: true,
            accountTypes: [
                "CHECKING",
                "CHEQUING",
                "SAVINGS",
                "CREDIT_CARD",
                "LOAN",
                "INVESTMENT",
            ],
        });

        const fetchBankAccount = async () => {
            state.isLoading = true;

            const bankAccountId = parseInt(route.params.id);
            if (isNaN(bankAccountId) || route.params.id === '0') {
                console.log('bankAccountId is NaN or 0')
                //return a blank bank account in the state.bankAccount
                state.bankAccount = {
                    account_name: '',
                    account_type: '',
                    bank_name: '',
                    currency: '',
                };
                console.log('state.bankAccount', state.bankAccount)
            } else {
                try {
                    const response = await axiosInstance.get(`bank-accounts/${bankAccountId}`)
                    state.bankAccount = response.data;
                } catch (error) {
                    console.error(`Failed to fetch bank account ${bankAccountId}:`, error);
                }
            }

            state.isLoading = false;
        }

        const updateBankAccount = async () => {
            console.log('updateBankAccount')
            const bankAccountId = parseInt(route.params.id);
            if (isNaN(bankAccountId)) {
                return;
            }
            if (route.params.id === '0') {
                try {
                    await axiosInstance.post('bank-accounts', state.bankAccount);
                    router.push('/bank-accounts');
                } catch (error) {
                    console.error(`Failed to create bank account:`, error);
                }
            } else {
                try {
                    await axiosInstance.put(`bank-accounts/${bankAccountId}`, state.bankAccount);
                    router.push(`/bank-accounts/${bankAccountId}`);
                } catch (error) {
                    console.error(`Failed to update bank account ${bankAccountId}:`, error);
                }
            }
        }

        watch(route, fetchBankAccount);

        onMounted(fetchBankAccount);

        return {
            ...toRefs(state),
            fetchBankAccount,
            updateBankAccount,
            accountTypes: state.accountTypes,
            route,
            router
        }
    },
};
</script>

<style scoped>
/* Add any additional styling here */
</style>
