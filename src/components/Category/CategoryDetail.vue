<template>
    <v-container>
        <v-btn color="primary" @click="$router.push('/categories')">Back</v-btn>
        <router-link v-if="category && category.id" :to="`/categories/edit/${category.id}`">
            <v-btn color="secondary">Edit Category</v-btn>
        </router-link>
        <v-card v-if="category && category.id">
            <v-card-title>
                <span class="text-h5">{{ category.name }}</span>
                <v-icon :color="category.colorCode">{{ category.icon }}</v-icon>
            </v-card-title>
            <v-card-text>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>ID</v-list-item-title>
                        <v-list-item-subtitle>{{ category.id }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>Description</v-list-item-title>
                        <v-list-item-subtitle>{{ category.description }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>Color</v-list-item-title>
                        <v-list-item-subtitle>{{ category.colorCode }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>Icon</v-list-item-title>
                        <v-list-item-subtitle>{{ category.icon }}</v-list-item-subtitle>
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
            category: null
        });

        const fetchCategory = async () => {
            const categoryId = parseInt(route.params.id);
            if (isNaN(categoryId)) {
                return;
            }
            try {
                const response = await axiosInstance.get(`categories/${categoryId}`)
                state.category = response.data;
            } catch (error) {
                console.error(`Failed to fetch category ${categoryId}:`, error);
            }
        }

        watch(route, fetchCategory);

        onMounted(fetchCategory);

        return {
            ...toRefs(state),
            fetchCategory,
            route,
            router
        }
    },
};
</script>

<style scoped>
/* Add any additional styling here */
</style>
