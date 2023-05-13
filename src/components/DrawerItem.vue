<template>
    <v-list-item :to="to" v-if="show">
        <v-row align="center">
            <v-col cols="auto">
                <v-list-item-icon>
                    <v-icon>{{ icon }}</v-icon>
                </v-list-item-icon>
            </v-col>
            <v-col cols="auto">
                <v-list-item-content>
                    <v-list-item-title>{{ label }}</v-list-item-title>
                </v-list-item-content>
            </v-col>
        </v-row>
    </v-list-item>
</template>

<script>
export default {
    props: {
        to: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            required: true,
        },
        show: {
            type: Boolean,
            default: true,
        },
    },
};
</script>
