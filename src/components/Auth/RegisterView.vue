<template>
    <div class="register">
        <h1>Register Page</h1>
        <RegisterForm @register="handleRegister" :validationError="validationError"/>
    </div>
</template>

<script>
import {ref} from 'vue';
import RegisterForm from '@/components/Auth/RegisterForm.vue';
import axiosInstance from '../../axios.js'; // assuming axiosInstance is exported from this path
import {useRouter} from 'vue-router'

export default {
    name: 'RegisterView',
    components: {
        RegisterForm,
    },
    setup() {
        const router = useRouter();

        const validationError = ref('');

        const handleRegister = async (credentials) => {
            try {
                const response = await axiosInstance.post('/users/check-email', {"email": credentials.email});

                if (response.data.emailExists) {
                    validationError.value = 'This email is already in use.';
                } else {
                    await axiosInstance.post('/users/register', credentials);
                    router.push('/login');
                }

            } catch (error) {
                console.log('Register error:', error);
            }
        };

        return {
            validationError,
            handleRegister
        };
    },
};
</script>

<style scoped>
.register {
    text-align: center;
    margin-top: 40px;
}

h1 {
    font-size: 2em;
    margin-bottom: 0.5em;
}
</style>
