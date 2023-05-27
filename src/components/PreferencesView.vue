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
        const items = ["light", "dark", "blue", "green", "red", "purple", "pink", "millennial_pink",
            "burnt_orange", "black_cherry"
        ];

        const simpleLayoutModel = computed({
            get: () => store.state.store.simpleLayout,
            set: value => {
                store.dispatch('store/setSimpleLayout', value)
                store.dispatch('notifications/addNotification', 'Layout changed to ' + (!value ? 'simple' : 'material') + '');
                //store.dispatch('messages/addMessage', 'Layout changed to ' + (!value ? 'simple' : 'material') + '');
            }
        });

        const darkModeModel = computed({
            get: () => store.state.store.darkMode,
            set: value => store.dispatch('store/setDarkMode', value)
        });

        const themeName = computed({
            get: () => store.state.store.themeName,
            set: value => {
                store.dispatch('store/setThemeName', value)
                store.dispatch('notifications/addNotification', 'Theme changed to ' + value + '');
                //store.dispatch('messages/addMessage', 'Theme changed to ' + value + '');
            }
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
