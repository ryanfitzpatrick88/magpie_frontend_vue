<template>
    <v-row>
        <v-col cols="12">
            <div class="text-h4 font-weight-medium">{{ title }}</div>
            <div v-if="subtitle" class="text-subtitle-1 text-muted">{{ subtitle }}</div>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'the-header',
    props: {
        title: {
            type: String,
            required: true,
        },
        subtitle: {
            type: String,
            default: '',
        },
    },
    setup(props) {
        return {
            props
        };
    },
};
</script>
