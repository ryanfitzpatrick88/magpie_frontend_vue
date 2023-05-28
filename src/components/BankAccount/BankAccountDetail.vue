<template>
    <v-container>
        <v-btn color="primary" @click="$router.push('/bank-accounts')">Back</v-btn>
        <router-link v-if="bankAccount && bankAccount.id" :to="`/bank-accounts/edit/${bankAccount.id}`">
            <v-btn color="secondary">Edit Bank Account</v-btn>
        </router-link>
        <v-card v-if="bankAccount && bankAccount.id">
            <v-card-title>
                <span class="text-h5">{{ bankAccount.account_name }}</span>
            </v-card-title>
            <v-card-text>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>ID</v-list-item-title>
                        <v-list-item-subtitle>{{ bankAccount.id }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>Type</v-list-item-title>
                        <v-list-item-subtitle>{{ bankAccount.account_type }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>Bank</v-list-item-title>
                        <v-list-item-subtitle>{{ bankAccount.bank_name }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>Currency</v-list-item-title>
                        <v-list-item-subtitle>{{ bankAccount.currency }}</v-list-item-subtitle>
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
            bankAccount: null
        });

        const fetchBankAccount = async () => {
            const bankAccountId = parseInt(route.params.id);
            if (isNaN(bankAccountId)) {
                return;
            }
            try {
                const response = await axiosInstance.get(`bank-accounts/${bankAccountId}`)
                state.bankAccount = response.data;
            } catch (error) {
                console.error(`Failed to fetch bank account ${bankAccountId}:`, error);
            }
        }

        watch(route, fetchBankAccount);

        onMounted(fetchBankAccount);

        return {
            ...toRefs(state),
            fetchBankAccount,
            route,
            router
        }
    },
};
</script>

<style scoped>
/* Add any additional styling here */
</style>
