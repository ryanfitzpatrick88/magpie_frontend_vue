<template>
    <the-breadcrumb :crumbs="breadcrumbs"/>
    <the-header title="Merchant List" subtitle="" :actions="[
        {icon: 'mdi-plus', onClick: () => goToCreate($router)},
    ]"/>
    <v-container class="merchant-list">
        <v-data-table
                v-if="$route.name === 'MerchantList'"
                :headers="headers"
                :items="merchants"
                class="elevation-1"
        >
            <template v-slot:item.category="{ item }">
                <v-chip>
                    <v-icon class="mr-2" :color="item.raw.category.colorCode">
                        {{ item.raw.category.icon }}
                    </v-icon>
                    {{ item.raw.category.name }}
                </v-chip>
            </template>
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
import {ref, onMounted, computed} from 'vue'
import axiosInstance from '../../axios.js'
import TheHeader from '../../components/TheHeader.vue';
import TheBreadcrumb from "../../components/TheBreadcrumb.vue";
import {useRoute} from "vue-router";

export default {
    components: {
        TheHeader,
        TheBreadcrumb,
    },
    setup() {
        const merchants = ref([]);
        const headers = ref([
            {title: 'ID', align: 'start', sortable: true, key: 'id'},
            {title: 'Name', align: 'end', key: 'name'},
            {title: 'Category', align: 'end', key: 'category'},
            {title: 'Actions', align: 'end', key: 'actions'},
        ]);

        const route = useRoute();
        const breadcrumbs = computed(() => {
            let crumbs = [
                {text: 'Home', to: {name: 'HomeView'}},
                {text: 'Merchant List', to: {name: 'MerchantList'}},
            ];
            if (route.name === 'MerchantDetail') {
                crumbs.push({
                    text: route.params.id,
                    to: {name: 'MerchantDetail', params: {id: route.params.id}}
                });
            } else if (route.name === 'MerchantEdit') {
                crumbs.push({
                    text: "Edit",
                    to: {name: 'MerchantDetail', params: {id: route.params.id}}
                }, {
                    text: route.params.id,
                    to: {name: 'MerchantEdit', params: {id: route.params.id}}
                });
            }
            return crumbs;
        });

        const fetchMerchants = async () => {
            try {
                const response = await axiosInstance.get('merchants');
                console.log('Fetched merchants:', response.data)
                merchants.value = response.data;
            } catch (error) {
                console.error('Failed to fetch merchants:', error);
            }
        }

        const goToCreate = (router) => {
            router.push({name: 'MerchantEdit', params: {id: 0}});
        }

        const goToDetail = (router, id) => {
            router.push({name: 'MerchantDetail', params: {id}});
        }

        onMounted(fetchMerchants);

        return {
            merchants,
            headers,
            breadcrumbs,
            goToDetail,
            goToCreate
        }
    }
};
</script>

<style scoped>
/* your styles remain the same */
</style>
