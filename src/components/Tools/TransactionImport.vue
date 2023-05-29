<template>
    <v-container>
        <v-form>
            <v-card>
                <v-card-title>
                    <span class="text-h5">Import Transactions</span>
                </v-card-title>
            </v-card>
            <v-select
                    v-model="account"
                    :items="accounts"
                    item-value="id"
                    item-title="combinedTitle"
                    label="Account"
                    eager="eager"
                    return-object/>
        </v-form>
        <v-card v-show="account != null">
            <v-file-input label="Upload CSV" @change="previewFile"
                          accept=".csv"></v-file-input>
            <v-data-table
                    v-if="transactions.length"
                    :headers="headers"
                    :items="transactions">
            </v-data-table>
            <v-btn color="primary" @click="confirmUpload" :disabled="!transactions.length">Confirm Upload</v-btn>
        </v-card>
    </v-container>
</template>

<script>
import {onMounted, ref, reactive, toRefs, watch} from 'vue';
import axiosInstance from '../../axios.js';

export default {
    setup() {
        const state = reactive({
            accounts: [],
            account: null,
        })
        const transactions = ref([]);
        const file = ref(null);
        const headers = ref([
            {title: 'Date', align: 'start', sortable: true, key: 'date'},
            {title: 'Description', align: 'end', key: 'description'},
            {title: 'Amount', align: 'end', key: 'amount'},
        ]);

        const previewFile = async (event) => {
            const selectedFile = event.target.files[0];
            file.value = selectedFile;
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('id', state.account.id);
            try {
                const response = await axiosInstance.post('/transactions/preview', formData);
                transactions.value = response.data;
            } catch (error) {
                console.error('Failed to preview transactions:', error);
            }
        };

        const confirmUpload = async () => {
            const formData = new FormData();
            formData.append('file', file.value);
            formData.append('id', state.account.id);
            try {
                await axiosInstance.post('/transactions/upload', formData);
                transactions.value = [];
                file.value = null;
            } catch (error) {
                console.error('Failed to upload transactions:', error);
            }
        };

        const fetchAccounts = async () => {
            try {
                const response = await axiosInstance.get('bank-accounts');
                var accounts_raw = response.data.map(account => ({
                    ...account,
                    combinedTitle: `${account.account_name} - ${account.account_type}`
                }));
                console.log('accounts: ' + accounts_raw[0].combinedTitle)
                state.accounts = accounts_raw;
                accounts_raw.forEach(account => {
                    console.log('account:', account);
                });
            } catch (error) {
                console.error('Failed to fetch accounts:', error);
            }
        };

        watch(state.accounts, (newVal) => {
            console.log('accounts updated:', newVal);
        });

        onMounted(async () => {
            await fetchAccounts();
        });

        return {
            ...toRefs(state),
            transactions,
            headers,
            fetchAccounts,
            previewFile,
            confirmUpload,
        };
    },
};
</script>
