<template>
    <div>
        <v-row align="center">
            <v-col cols="4">
                <v-select
                        v-model="selectedProperty"
                        :items="properties"
                        label="Select property"
                        outlined
                        dense
                ></v-select>
            </v-col>
            <v-col cols="6">
                <v-text-field
                        v-model="searchTerm"
                        filled
                        color="primary"
                        label="Search"
                        prepend-inner-icon="mdi-magnify"
                ></v-text-field>
            </v-col>
            <!-- make the filter button the same height as the search  -->
            <v-col cols="2">
                <v-btn color="primary" @click="dialog = true">
                    <v-icon>mdi-filter</v-icon>
                </v-btn>
                <v-dialog v-model="dialog" max-width="500px">
                    <v-card>
                        <v-card-title>
                            <span class="text-h5">Filters</span>
                        </v-card-title>
                        <v-card-text>
                            <div v-for="filter in filters" :key="filter.name" class="my-2">
                                <v-checkbox v-model="activeFilters[filter.name]" :label="filter.name"></v-checkbox>
                            </div>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>
        <slot :items="filteredItems"></slot>
    </div>
</template>

<script>
import {ref, computed, reactive} from 'vue';

export default {
    name: 'SearchFilter',
    props: {
        items: {type: Array, required: true},
        properties: {type: Array, required: true},
        filters: {type: Array, default: () => []}
    },
    setup(props) {
        const searchTerm = ref('');
        const selectedProperty = ref(props.properties[0]); // default to first property
        const activeFilters = reactive(props.filters.reduce((obj, filter) => ({...obj, [filter.name]: false}), {}));
        const dialog = ref(false);

        const filteredItems = computed(() => {
            let items = props.items;

            if (searchTerm.value) {
                items = items.filter(item =>
                    String(item[selectedProperty.value]).toLowerCase().includes(searchTerm.value.toLowerCase())
                );
            }

            for (const filter of props.filters) {
                if (activeFilters[filter.name]) {
                    items = items.filter(filter.filter);
                }
            }

            return items;
        });

        return {searchTerm, selectedProperty, activeFilters, filteredItems, dialog};
    }
};
</script>

