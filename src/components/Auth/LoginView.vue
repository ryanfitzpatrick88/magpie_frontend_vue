<template>
    <div class="login">
        <h1>Login Page</h1>
        <LoginForm @login="handleLogin"/>
    </div>
</template>

<script>
import LoginForm from '@/components/Auth/LoginForm.vue';
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'

export default {
    name: 'LoginView',
    components: {
        LoginForm,
    },
    setup() {
        const router = useRouter()
        const store = useStore()

        const handleLogin = () => {
            store.dispatch('store/setLoggedIn', true);
            router.push('/protected_route');
        }

        return {
            handleLogin
        }
    },
};
</script>

<style>
.login {
    text-align: center;
    margin-top: 40px;
}

h1 {
    font-size: 2em;
    margin-bottom: 0.5em;
}
</style>
