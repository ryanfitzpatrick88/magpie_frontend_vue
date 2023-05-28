<template>
    <v-container>
        <v-btn color="primary" @click="$router.push('/import-batches')">Back</v-btn>
        <v-row v-if="importBatch && importBatch.id">
            <v-col>
                <v-card height="500px">
                    <v-card-title>
                        <span class="text-h5">{{ importBatch.file_name }}</span>
                    </v-card-title>
                    <v-card-text>
                        <!-- id, imported_at, source, user_id-->
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>ID</v-list-item-title>
                                <v-list-item-subtitle>{{ importBatch.id }}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>Imported At</v-list-item-title>
                                <v-list-item-subtitle>{{ importBatch.imported_at }}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>Source</v-list-item-title>
                                <v-list-item-subtitle>{{ importBatch.source }}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>User ID</v-list-item-title>
                                <v-list-item-subtitle>{{ importBatch.user_id }}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col>
                <v-card height="500px">
                    <v-card-title>
                        <span class="text-h5">Transactions</span>
                    </v-card-title>
                    <v-infinite-scroll
                            height="450px"
                            mode="manual"
                            @load="load"
                    >
                        <template v-for="(transaction, index) in transactions" :key="transaction.id">
                            <v-list-item :class="['px-2', index % 2 === 0 ? 'bg-grey-lighten-2' : '']">
                                <v-list-item-content>
                                    <v-list-item-title class="headline">{{
                                        transaction.description
                                        }}
                                    </v-list-item-title>
                                    <v-row>
                                        <v-col cols="6" class="text-start subtitle-1">{{ transaction.date }}</v-col>
                                        <v-col cols="6" class="text-end subtitle-1">{{ transaction.amount }}</v-col>
                                    </v-row>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                    </v-infinite-scroll>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {onMounted, reactive, ref, watch, toRefs} from 'vue';
import {useRoute} from 'vue-router';
import axiosInstance from '../../axios.js';

export default {
    setup() {
        const route = useRoute();
        const loading = ref(false);
        const transactions = ref([]);
        const transactionList = ref(null);
        const state = reactive({
            importBatch: null
        });
        let nextPage = 1;

        const fetchImportBatch = async () => {
            const batchId = parseInt(route.params.id);
            if (isNaN(batchId)) {
                //console.error('Invalid user ID');
                return;
            }
            try {
                const response = await axiosInstance.get(`import-batches/${batchId}`)
                console.log(response.data);
                state.importBatch = response.data;
            } catch (error) {
                console.error(`Failed to fetch importBatch ${batchId}:`, error);
            }
        }
        const load = async ({done}) => {
            if (loading.value) return;
            loading.value = true;

            try {
                //create a new url for transaction/batch/{id}
                const response = await axiosInstance.get(`transactions/batch/${route.params.id}`, {
                    params: {
                        page: nextPage,
                    },
                });
                //refactor the last statement to escape the string and put the batch id in


                transactions.value.push(...response.data);
                nextPage++;
                done('ok')
            } catch (error) {
                console.error('Failed to fetch transactions:', error);
                done('error')
            } finally {
                loading.value = false;
            }
        };


        onMounted(async () => {
            //fetchTransactions();
            fetchImportBatch();
            await load({
                done: () => {
                }
            });
        });

        watch(route, () => {
            transactions.value = [];
            nextPage = 1;
            fetchImportBatch();
        });

        return {
            ...toRefs(state),
            fetchImportBatch,
            load,
            loading,
            transactions,
            transactionList,
        };
    },
};
</script>

<style scoped>
/* stylish header for v-card-title */
.v-card-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
