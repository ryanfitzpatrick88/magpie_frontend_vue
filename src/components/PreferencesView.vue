<template>
    <v-container>
        <v-row class="my-5">
            <v-col cols="12">
                <v-switch
                        v-model="simpleLayoutModel"
                        label="Material Layout"
                        color="primary"
                ></v-switch>
            </v-col>
            <v-col cols="12">
                <v-switch
                        v-model="darkModeModel"
                        label="Dark Mode"
                        color="primary"
                ></v-switch>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {computed} from 'vue';
import {useStore} from 'vuex';

export default {
    setup() {
        const store = useStore();

        const simpleLayoutModel = computed({
            get: () => store.state.simpleLayout,
            set: value => store.dispatch('setSimpleLayout', value)
        });

        const darkModeModel = computed({
            get: () => store.state.darkMode,
            set: value => store.dispatch('setDarkMode', value)
        });

        return {
            simpleLayoutModel,
            darkModeModel
        };
    }
};
</script>

<style scoped>
</style>
