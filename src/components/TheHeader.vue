<template>
    <v-row>
        <v-col cols="11">
            <div class="text-h4 font-weight-medium">{{ title }}</div>
            <div v-if="subtitle" class="text-subtitle-1 text-muted">{{ subtitle }}</div>
        </v-col>
        <v-col cols="1">
            <div v-for="(action, index) in actions" :key="index">
                <v-btn @click="action.onClick">
                    <v-icon>{{ action.icon }}</v-icon>
                </v-btn>
            </div>
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
        actions: {
            type: Array,
            default: () => [],
        },
    },
    setup(props) {
        return {
            props
        };
    },
};
</script>
