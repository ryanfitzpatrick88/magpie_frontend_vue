export default {
    namespaced: true,
    state: {
        notifications: JSON.parse(localStorage.getItem('notifications')) || [],
    },
    mutations: {
        addNotification(state, notification) {
            // Create a new array with the new notification
            const newNotifications = [...state.notifications, notification];
            // Replace the old state with the new state
            state.notifications = newNotifications;
            localStorage.setItem('notifications', JSON.stringify(newNotifications));
        },
        removeNotification(state, notification) {
            const newNotifications = state.notifications.filter(n => n !== notification);
            state.notifications = newNotifications;
            localStorage.setItem('notifications', JSON.stringify(newNotifications));
        }
    },
    actions: {
        addNotification({commit}, notification) {
            commit('addNotification', notification);
        },
        removeNotification({commit}, notification) {
            commit('removeNotification', notification);
        }
    },
};
