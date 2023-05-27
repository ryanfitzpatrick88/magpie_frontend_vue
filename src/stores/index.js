import {createStore} from 'vuex';
import messages from './messages.js';
import store from './store.js';
import notifications from "./notifications";

export default createStore({
    modules: {
        messages,
        store,
        notifications
    }
});