<template>
    <v-card class="login-form">
        <v-card-title>Login</v-card-title>
        <v-form @submit.prevent="submitLoginForm">
            <v-text-field
                    v-model="email"
                    label="Email"
                    type="email"
                    outlined
                    required
            />
            <v-text-field
                    v-model="password"
                    label="Password"
                    type="password"
                    outlined
                    required
            />
            <v-row>
                <v-col cols="6">
                    <v-btn color="primary" type="submit" block>Login</v-btn>
                </v-col>
                <v-col cols="6">
                    <v-btn block to="/register">Register</v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-card>
</template>

<script>
import {ref} from 'vue'
import axiosInstance from '../axios.js'

export default {
    name: 'LoginForm',
    setup(_, {emit}) {
        const email = ref('')
        const password = ref('')

        const submitLoginForm = async () => {
            try {
                const response = await axiosInstance.post('auth/login', {
                    email: email.value,
                    password: password.value
                });
                // Handle successful login
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('token_type', response.data.token_type);
                localStorage.setItem('refresh_token', response.data.refresh_token);
                // Emit login event
                emit('login', response.data);
            } catch (error) {
                console.log('Login error:', error);
            }
        }

        return {
            email,
            password,
            submitLoginForm
        }
    }
};
</script>

<style scoped>
.login-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
}
</style>
