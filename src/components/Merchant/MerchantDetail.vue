<template>
    <v-container>
        <v-btn color="primary" @click="$router.push('/merchants')">Back</v-btn>
        <router-link v-if="merchant && merchant.id" :to="`/merchants/edit/${merchant.id}`">
            <v-btn color="secondary">Edit Merchant</v-btn>
        </router-link>
        <v-card v-if="merchant && merchant.id">
            <v-card-title>
                <span class="text-h5">{{ merchant.name }}</span>
            </v-card-title>
            <v-card-text>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>ID</v-list-item-title>
                        <v-list-item-subtitle>{{ merchant.id }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>Name</v-list-item-title>
                        <v-list-item-subtitle>{{ merchant.name }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>Category</v-list-item-title>
                        <v-list-item-subtitle>
                            <v-chip>
                                <v-icon class="mr-2" :color="merchant.category.colorCode">
                                    {{ merchant.category.icon }}
                                </v-icon>
                                {{ merchant.category.name }}
                            </v-chip>
                        </v-list-item-subtitle>
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
            merchant: null
        });

        const fetchMerchant = async () => {
            const merchantId = parseInt(route.params.id);
            if (isNaN(merchantId)) {
                return;
            }
            try {
                const response = await axiosInstance.get(`merchants/${merchantId}`)
                state.merchant = response.data;
            } catch (error) {
                console.error(`Failed to fetch merchant ${merchantId}:`, error);
            }
        }

        watch(route, fetchMerchant);

        onMounted(fetchMerchant);

        return {
            ...toRefs(state),
            fetchMerchant,
            route,
            router
        }
    },
};
</script>

<style scoped>
/* Add any additional styling here */
</style>
