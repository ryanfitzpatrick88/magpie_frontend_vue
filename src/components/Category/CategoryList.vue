<template>
    <the-breadcrumb :crumbs="breadcrumbs"/>
    <the-header title="Category List" subtitle="" :actions="[
        {icon: 'mdi-plus', onClick: () => goToCreate($router)},
    ]"/>
    <v-container class="category-list">
        <v-data-table
                v-if="$route.name === 'CategoryList'"
                :headers="headers"
                :items="categories"
                class="elevation-1"
        >
            <template v-slot:item.colorCode="{ item }">
                <v-chip :color="item.raw.colorCode">
                    {{ item.raw.colorCode }}
                </v-chip>
            </template>
            <template v-slot:item.icon="{ item }">
                <v-icon :color="item.raw.colorCode">{{ item.raw.icon }}</v-icon>
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
        const categories = ref([]);
        const headers = ref([
            {title: 'ID', align: 'start', sortable: true, key: 'id'},
            {title: 'Name', align: 'end', key: 'name'},
            {title: 'Description', align: 'end', key: 'description'},
            {title: 'Color Code', align: 'end', key: 'colorCode'},
            {title: 'Icon', align: 'end', key: 'icon'},
            {title: 'Actions', align: 'end', key: 'actions'},
        ]);

        const route = useRoute();
        const breadcrumbs = computed(() => {
            let crumbs = [
                {text: 'Home', to: {name: 'HomeView'}},
                {text: 'Category List', to: {name: 'CategoryList'}},
            ];
            if (route.name === 'CategoryDetail') {
                crumbs.push({
                    text: route.params.id,
                    to: {name: 'CategoryDetail', params: {id: route.params.id}}
                });
            } else if (route.name === 'CategoryEdit') {
                crumbs.push({
                    text: "Edit",
                    to: {name: 'CategoryDetail', params: {id: route.params.id}}
                }, {
                    text: route.params.id,
                    to: {name: 'CategoryEdit', params: {id: route.params.id}}
                });
            }
            return crumbs;
        });

        const fetchCategories = async () => {
            try {
                const response = await axiosInstance.get('categories');
                categories.value = response.data;
                console.log('categories:' + categories.value)
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        }

        const goToCreate = (router) => {
            router.push({name: 'CategoryEdit', params: {id: 0}});
        }

        const goToDetail = (router, id) => {
            router.push({name: 'CategoryDetail', params: {id}});
        }

        onMounted(fetchCategories);

        return {
            categories,
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
