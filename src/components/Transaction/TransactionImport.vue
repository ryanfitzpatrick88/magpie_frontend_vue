<template>
    <v-container>
        <v-select
                v-model="account"
                :items="accounts"
                item-text="name"
                item-value="id"
                label="Account"
                outlined
                dense
                clearable>
        </v-select>
        <v-card v-show="false">
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
import {onMounted, ref} from 'vue';
import axiosInstance from '../../axios.js';

export default {
    setup() {
        const account = ref(null);
        const accounts = ref([]);
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
                accounts.value = response.data;
            } catch (error) {
                console.error('Failed to fetch accounts:', error);
            }
        };

        onMounted(() => {
            fetchAccounts();
        });

        return {
            transactions,
            headers,
            accounts,
            account,
            fetchAccounts,
            previewFile,
            confirmUpload,
        };
    },
};
</script>
