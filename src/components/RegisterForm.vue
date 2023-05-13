<template>
    <v-card class="register-form">
        <v-card-title>Register</v-card-title>
        <v-form @submit.prevent="submitRegisterForm" ref="form">
            <v-text-field
                    v-model="email"
                    label="Email"
                    type="email"
                    outlined
                    :rules="emailRules"
                    required
            />
            <v-text-field
                    v-model="password"
                    label="Password"
                    type="password"
                    outlined
                    :rules="passwordRules"
                    required
            />
            <v-alert v-if="validationError" type="error" class="mb-6">
                {{ validationError }}
            </v-alert>
            <v-btn type="submit">Register</v-btn>
        </v-form>
    </v-card>
</template>

<script>
export default {
    props: ['validationError'],
    data() {
        return {
            email: '',
            password: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            passwordRules: [
                v => !!v || 'Password is required',
            ],
        };
    },
    methods: {
        submitRegisterForm() {
            if (this.$refs.form.validate()) {
                this.$emit('register', {
                    email: this.email,
                    password: this.password,
                });
            }
        },
    },
};
</script>

<style scoped>
.register-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
}
</style>
