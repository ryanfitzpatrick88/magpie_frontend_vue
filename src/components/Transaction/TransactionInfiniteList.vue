<template>
    <div class="left-section">
        <v-infinite-scroll mode="manual" @load="load">
            <template v-for="(transaction, index) in transactions" :key="transaction.id">
                <v-list-item :class="['px-2', index % 2 === 0 ? 'bg-grey-lighten-2' : '']">
                    <v-list-item-content>
                        <v-list-item-title class="headline">{{ transaction.description }}</v-list-item-title>
                        <v-row>
                            <v-col cols="6" class="text-start subtitle-1">{{ transaction.date }}</v-col>
                            <v-col cols="6" class="text-end subtitle-1">{{ transaction.amount }}</v-col>
                        </v-row>
                    </v-list-item-content>
                </v-list-item>
            </template>
        </v-infinite-scroll>
    </div>
</template>

<script>
import {ref, onMounted} from 'vue';
import axiosInstance from "@/axios";
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
        const transactions = ref([]);
        const loading = ref(false);
        let nextPage = 0;

        const load = async ({done}) => {
            if (loading.value) return;
            loading.value = true;

            try {
                const formattedStartDate = format(props.startDate, 'yyyy-MM-dd');
                const formattedEndDate = format(props.endDate, 'yyyy-MM-dd');

                const response = await axiosInstance.get(`transactions/getByDateRange`, {
                    params: {
                        page: nextPage,
                        start_date: formattedStartDate,
                        end_date: formattedEndDate,
                    },
                });

                transactions.value.push(...response.data);
                nextPage++;
                done('ok');
            } catch (error) {
                console.error('Failed to fetch transactions:', error);
                done('error');
            } finally {
                loading.value = false;
            }
        };

        onMounted(async () => {
            await load({
                done: () => {
                }
            });
        });

        return {
            transactions,
            onMounted,
            load,
        };
    },
};
</script>

