<template>
    <import-batch-breadcrumb :crumbs="breadcrumbs"/>
    <the-header title="Import Batch List" subtitle=""/>
    <v-container class="import-batch-list">
        <v-data-table
                v-if="$route.name === 'ImportBatchList'"
                :headers="headers"
                :items="import_batches"
                class="elevation-1"
        >
            <template v-slot:item.actions="{ item }">
                <v-btn color="primary" @click="goToDetail($router, item.raw.id)">
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>
            </template>
        </v-data-table>
        <router-view/>
    </v-container>
</template>

<script>
import {ref, onMounted, watch, reactive, computed} from 'vue'
import axiosInstance from '../axios.js'
import TheHeader from '@/components/TheHeader.vue';
import ImportBatchBreadcrumb from "@/components/ImportBatchBreadcrumb.vue";
import {useRoute} from 'vue-router';

export default {
    components: {
        TheHeader, // Register the component
        ImportBatchBreadcrumb,
    },
    setup() {
        const import_batches = ref([]);
        const headers = ref([
            {title: 'ID', align: 'start', sortable: true, key: 'id'},
            {title: 'Imported At', align: 'end', key: 'imported_at'},
            {title: 'Source', align: 'end', key: 'source'},
            {title: 'User ID', align: 'end', key: 'user_id'},
            {title: 'File Name', align: 'end', key: 'file_name'},
            {title: 'Actions', align: 'end', key: 'actions'},
        ]);
        const route = useRoute();
        const state = reactive({
            breadcrumbs: [
                {text: 'Home', to: {name: 'HomeView'}},
                {text: 'Import Batches', to: {name: 'ImportBatchList'}},
            ],
        });
        if (route.name == 'ImportBatchDetail') {
            state.breadcrumbs.value.push({
                text: route.params.id,
                to: {name: 'ImportBatchDetail', params: {id: route.params.id}}
            });
        }
        watch(() => route.name, (newVal, oldVal) => {
            if (newVal === 'ImportBatchDetail') {
                state.breadcrumbs.push({
                    text: route.params.id,
                    to: {name: 'ImportBatchDetail', params: {id: route.params.id}}
                });
            } else if (oldVal === 'ImportBatchDetail') {
                // Remove the last breadcrumb when navigating away from 'ImportBatchDetail'
                state.breadcrumbs.pop();
            }
        });
        const fetchImportBatches = async () => {
            try {
                const response = await axiosInstance.get('/import-batches');
                import_batches.value = response.data;
            } catch (error) {
                console.error('Failed to fetch import_batches:', error);
            }
        }

        const getColor = (is_active) => {
            return is_active ? 'green' : 'red';
        }

        const goToDetail = (router, id) => {
            router.push({name: 'ImportBatchDetail', params: {id}});
        }

        onMounted(fetchImportBatches);

        return {
            import_batches,
            headers,
            breadcrumbs: computed(() => state.breadcrumbs),
            getColor,
            goToDetail,
        }
    }
};
</script>

<style scoped>
/* your styles remain the same */
</style>

