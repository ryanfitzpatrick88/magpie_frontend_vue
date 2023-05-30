<template>
    <v-container>
        <router-link v-if="merchant && merchant.id" :to="`/merchants/${merchant.id}`">
            <v-btn color="secondary">Back</v-btn>
        </router-link>

        <v-form v-if="!isLoading" @submit.prevent="updateMerchant">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ isNewMerchant ? 'Create New Merchant' : 'Edit Merchant' }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="Merchant Name" v-model="merchant.name"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-select
                                        :items="categories"
                                        label="Category"
                                        item-title="name"
                                        item-value="id"
                                        v-model="merchant.category_id"
                                        eager="eager"
                                ></v-select>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
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
import {reactive, toRefs, onMounted, watch, computed, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import axiosInstance from '../../axios.js'
import {useStore} from 'vuex';

export default {
    setup() {
        const route = useRoute()
        const router = useRouter()
        const store = useStore();
        const state = reactive({
            merchant: null,
            isLoading: true,
            categories: [],
        })

        const isNewMerchant = computed(() => {
            const merchantId = parseInt(route.params.id)
            return isNaN(merchantId) || route.params.id === '0'
        })

        const fetchMerchant = async () => {
            state.isLoading = true

            const merchantId = parseInt(route.params.id)
            if (isNewMerchant.value) {
                // Return a blank merchant in the state.merchant
                state.merchant = {
                    name: '',
                    category_id: null,
                }
            } else {
                try {
                    const response = await axiosInstance.get(`merchants/${merchantId}`)
                    state.merchant = response.data
                } catch (error) {
                    console.error(`Failed to fetch merchant ${merchantId}:`, error)
                }
            }

            state.isLoading = false
        }

        const fetchCategories = async () => {
            try {
                const response = await axiosInstance.get('categories')
                console.log('categories.data', response.data)
                state.categories = response.data
            } catch (error) {
                console.error('Failed to fetch categories:', error)
            }
        }

        const updateMerchant = async () => {
            console.log(state.merchant)
            const merchantId = parseInt(route.params.id)
            if (isNaN(merchantId)) {
                return
            }

            try {
                if (isNewMerchant.value) {
                    await axiosInstance.post('merchants', state.merchant)
                    router.push('/merchants')
                    store.dispatch('notifications/addNotification', 'Merchant created');
                } else {
                    await axiosInstance.put(`merchants/${merchantId}`, state.merchant)
                    router.push(`/merchants/${merchantId}`)
                    store.dispatch('notifications/addNotification', 'Merchant updated');
                }
            } catch (error) {
                console.error(`Failed to ${isNewMerchant.value ? 'create' : 'update'} merchant ${merchantId}:`, error)
            }
        }

        watch(route, fetchMerchant)

        onMounted(() => {
            fetchMerchant()
            fetchCategories()
        })

        return {
            ...toRefs(state),
            isNewMerchant,
            fetchMerchant,
            updateMerchant,
            route,
            router,
        }
    },
}
</script>

<style scoped>
/* Add any additional styling here */
</style>
