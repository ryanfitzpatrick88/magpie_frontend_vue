<template>
    <v-dialog v-model="popupMessage" max-width="290">
        <v-card>
            <v-card-title class="headline">New Message</v-card-title>
            <v-card-text>{{ popupMessage }}</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="popupMessage = null">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import {watch, ref, computed} from 'vue'
import store from '../stores'

export default {
    setup() {
        const messages = computed(() => store.state.messages.messages);
        console.log(messages.value);
        const showDialog = ref(false);
        const popupMessage = ref(null);

        const closeDialog = () => {
            store.dispatch('messages/removeMessage', popupMessage.value);
            showDialog.value = false;
        };

        watch(
            messages,
            (newMessages, oldMessages) => {
                console.log('New message added')
                if (newMessages?.length || 0 > oldMessages?.length || 0) {

                    console.log(oldMessages)
                    popupMessage.value = newMessages[newMessages.length - 1];
                    showDialog.value = true;  // Show the dialog when a new message is added

                    //remove the message from messages
                    setTimeout(() => {
                        store.dispatch('messages/removeMessage', newMessages[newMessages.length - 1]);
                        showDialog.value = false;
                    }, 5000);
                }
            },
            {immediate: true}
        );

        return {
            messages, popupMessage, showDialog, closeDialog
        }
    },
}
</script>