<template>
    <v-container>
        <router-link v-if="category && category.id" :to="`/categories/${category.id}`">
            <v-btn color="secondary">Back</v-btn>
        </router-link>
        <v-form v-if="!isLoading" @submit.prevent="updateCategory">
            <v-card>
                <v-text-field label="Category Name" v-model="category.name"></v-text-field>
                <v-text-field label="Category Description" v-model="category.description"></v-text-field>
                <v-select :items="colors"
                          label="Color"
                          v-model="category.colorCode"
                          ref="colorSelect">
                    <template v-slot:prepend-inner>
                        <v-btn :color="category.colorCode"></v-btn>
                    </template>
                    <template v-slot:item="data">
                        <v-list-item @click="selectColor(data.item.raw)">
                            <div class="d-flex flex-row align-center">
                                <v-btn left class="mr-2" :color="data.item.raw"></v-btn>
                                <v-list-item-title>{{ data.item.raw }}</v-list-item-title>
                            </div>
                        </v-list-item>
                    </template>
                </v-select>
                <v-autocomplete :items="icons"
                                label="Icon"
                                v-model="category.icon"
                                v-model:search="search"
                                :search-input.sync="search"
                                :loading="loading"
                                hide-no-data
                                hide-details
                                cache-items
                                ref="select">
                    <template v-slot:prepend-inner>
                        <v-icon :color="category.color">{{ category.icon }}</v-icon>
                    </template>
                    <template v-slot:item="data">
                        <v-list-item @click="selectItem(data.item.raw)">
                            <div class="d-flex flex-row align-center">
                                <v-icon left class="mr-2">{{ data.item.raw }}</v-icon>
                                <v-list-item-title>{{ data.item.raw }}</v-list-item-title>
                            </div>
                        </v-list-item>
                    </template>
                </v-autocomplete>

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
import {reactive, toRefs, onMounted, watch, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import axiosInstance from '../../axios.js'
import icons from '../../framework/icons.js'

export default {
    setup() {
        const route = useRoute();
        const router = useRouter();
        const state = reactive({
            category: null,
            isLoading: true,
            loading: false,
            icons: icons,
            search: null,
        });
        const colors = [
            'red',
            'pink',
            'purple',
            'deep-purple',
            'indigo',
            'blue',
            'light-blue',
            'cyan',
            'teal',
            'green',
            'light-green',
            'lime',
            'yellow',
            'amber',
            'orange',
            'deep-orange',
            'brown',
            'blue-grey',
        ];

        const select = ref(null);
        const querySelections = (v) => {
            state.loading = true
            // Simulated ajax query
            setTimeout(() => {
                state.icons = icons.filter(e => {
                    return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
                })
                state.loading = false
            }, 500)
        };

        watch(state.search, (value) => {
            if (value) {
                value && value !== select && querySelections(value)
            }
        });
        const selectItem = (item) => {
            state.category.icon = item;
            select.value.blur();
        };

        const colorSelect = ref(null);
        const selectColor = (item) => {
            state.category.colorCode = item;
            colorSelect.value.blur();
        };

        const fetchCategory = async () => {
            state.isLoading = true;

            const categoryId = parseInt(route.params.id);
            if (isNaN(categoryId) || route.params.id === '0') {
                state.category = {
                    name: '',
                };
            } else {
                try {
                    const response = await axiosInstance.get(`categories/${categoryId}`)
                    state.category = response.data;
                } catch (error) {
                    console.error(`Failed to fetch category ${categoryId}:`, error);
                }
            }

            state.isLoading = false;
        }

        const updateCategory = async () => {
            const categoryId = parseInt(route.params.id);
            if (isNaN(categoryId)) {
                return;
            }
            if (route.params.id === '0') {
                try {
                    await axiosInstance.post('categories', state.category);
                    router.push('/categories');
                } catch (error) {
                    console.error(`Failed to create category:`, error);
                }
            } else {
                try {
                    await axiosInstance.put(`categories/${categoryId}`, state.category);
                    router.push(`/categories/${categoryId}`);
                } catch (error) {
                    console.error(`Failed to update category ${categoryId}:`, error);
                }
            }
        }

        watch(route, fetchCategory);

        onMounted(fetchCategory);

        return {
            ...toRefs(state),
            fetchCategory,
            updateCategory,
            selectColor,
            selectItem,
            colorSelect,
            select,
            colors,
            route,
            router,
            icons,
        }
    },
};
</script>

<style scoped>
/* Add any additional styling here */
</style>
