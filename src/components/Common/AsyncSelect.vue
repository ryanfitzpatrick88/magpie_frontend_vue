<template>
    <v-select
            v-model="model"
            :label="fullLabel"
            :rules="rules"
            :disabled="disabled"
            :clearable="clearable"
            :dense="dense"
            :outlined="outlined"
            :items="items"
            :loading="isLoading.value"
            v-bind="$attrs"
    >
        <template v-slot:prepend-item>
            <v-list-item>
                <v-list-item-title>Loading...</v-list-item-title>
            </v-list-item>
        </template>
    </v-select>
</template>

<script>
import {ref, watch, onMounted, computed} from 'vue';

export default {
    name: 'AsyncSelect',
    inheritAttrs: false,
    props: {
        loadItems: {
            type: Function,
            required: true
        },
        modelValue: {
            default: null
        },
        label: {
            type: String,
            default: null
        },
        rules: {
            type: Array,
            default: () => []
        },
        disabled: {
            type: Boolean,
            default: false
        },
        clearable: {
            type: Boolean,
            default: false
        },
        dense: {
            type: Boolean,
            default: false
        },
        outlined: {
            type: Boolean,
            default: false
        },
    },
    emits: ['update:modelValue'],
    setup(props, {emit}) {
        const items = ref([]);
        const isLoading = ref(false);
        const fullLabel = computed(() => props.label || 'Select');
        const model = computed({
            get() {
                return props.modelValue;
            },
            set(value) {
                emit('update:modelValue', value);
            }
        });

        const load = async () => {
            isLoading.value = true;
            try {
                items.value = await props.loadItems();
            } catch (error) {
                console.error('Failed to load items:', error);
            } finally {
                isLoading.value = false;
            }
        };

        onMounted(load);

        watch(props.loadItems, load, {immediate: true});

        return {
            items,
            isLoading,
            fullLabel,
            model,
            onInput: value => emit('update:modelValue', value),
        };
    }
};
</script>
