<template>
    <v-breadcrumbs :items="crumbs">
        <template v-slot:item="{ item }">
            <v-breadcrumbs-item :to="item.to" :key="item.text">
                {{ item.text }}
            </v-breadcrumbs-item>
        </template>
    </v-breadcrumbs>
</template>

<script>
export default {
    props: {
        crumbs: {
            type: Array,
            required: true,
        },
    },
};
</script>
