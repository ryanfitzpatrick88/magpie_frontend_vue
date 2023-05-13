<template>
    <nav class="nav-bar">
        <NavBarItem to="/" label="Home" icon="home" :show="!isLoggedIn"/>
        <NavBarItem to="/login" label="Login" icon="sign-in-alt" :show="!isLoggedIn"/>
        <NavBarItem to="/budget" label="Budget" icon="wallet" :show="isLoggedIn"/>
        <NavBarItem to="/transactions" label="Transaction" icon="exchange-alt" :show="isLoggedIn"/>
        <NavBarItem to="/category" label="Category" icon="list-alt" :show="isLoggedIn"/>
        <NavBarItem to="/users" label="User" icon="user" :show="isLoggedIn"/>
    </nav>
    <v-container>
        <router-view/>
    </v-container>
</template>

<script>
import {computed} from 'vue';
import {useStore} from 'vuex';
import NavBarItem from './NavBarItem.vue';

export default {
    components: {
        NavBarItem
    },
    setup() {
        const store = useStore();
        const isLoggedIn = computed(() => store.state.isLoggedIn);
        return {isLoggedIn};
    },
};
</script>

<style scoped>
.nav-bar {
    display: flex;
    justify-content: space-around;
    background-color: #333;
    padding: 1em;
}
</style>
