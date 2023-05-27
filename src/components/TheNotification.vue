<template>
    <v-snackbar v-model="showSnackbar" :timeout="5000" :color="snackbarColor">
        {{ snackbarMessage }}
        <v-btn text @click="closeSnackbar">Close</v-btn>
    </v-snackbar>
</template>

<script>
import {watch, ref, computed} from 'vue'
import store from '../stores/index.js'

export default {
    setup() {
        const notifications = computed(() => store.state.notifications.notifications);
        const showSnackbar = ref(false);
        const snackbarMessage = ref('');
        const snackbarColor = ref('info');  // you can change this based on the type of the notification

        const closeSnackbar = () => {
            store.dispatch('notifications/removeNotification', snackbarMessage.value);
            showSnackbar.value = false;
        };

        watch(
            notifications,
            (newNotifications, oldNotifications) => {
                if (newNotifications?.length > oldNotifications?.length) {
                    // A new notification was added, show it in the snackbar
                    snackbarMessage.value = newNotifications[newNotifications.length - 1];
                    showSnackbar.value = true;

                    // remove the notification from notifications after a delay
                    setTimeout(() => {
                        store.dispatch('notifications/removeNotification', newNotifications[newNotifications.length - 1]);
                    }, 5000);
                }
            },
            {immediate: true}
        );

        return {
            notifications, snackbarMessage, showSnackbar, closeSnackbar, snackbarColor
        }
    },
}
</script>
