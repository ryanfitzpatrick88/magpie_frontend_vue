export default {
    namespaced: true,
    state: {
        messages: JSON.parse(localStorage.getItem('messages')) || [],
    },
    mutations: {
        addMessage(state, message) {
            const newMessages = [...state.messages, message];
            state.messages = newMessages;
            localStorage.setItem('messages', JSON.stringify(newMessages));
        },
        removeMessage(state, message) {
            const newMessages = state.messages.filter(m => m !== message);
            state.messages = newMessages;
            localStorage.setItem('messages', JSON.stringify(newMessages));
        }
    },
    actions: {
        addMessage({commit}, message) {
            commit('addMessage', message);
        },
        removeMessage({commit}, message) {
            commit('removeMessage', message);
        }
    },
};