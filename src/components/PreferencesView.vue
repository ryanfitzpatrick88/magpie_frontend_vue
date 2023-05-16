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
                <v-select
                        v-model="themeName"
                        label="Theme"
                        color="primary"
                        :items="items"
                ></v-select>
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
        const items = ["light", "dark", "blue", "green", "red", "purple", "pink",
            "burnt_orange", "black_cherry"
        ];

        const simpleLayoutModel = computed({
            get: () => store.state.simpleLayout,
            set: value => store.dispatch('setSimpleLayout', value)
        });

        const darkModeModel = computed({
            get: () => store.state.darkMode,
            set: value => store.dispatch('setDarkMode', value)
        });

        const themeName = computed({
            get: () => store.state.themeName,
            set: value => store.dispatch('setThemeName', value)
        });

        return {
            simpleLayoutModel,
            darkModeModel,
            themeName,
            items
        };
    }
};
</script>

<style scoped>
</style>
