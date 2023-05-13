<template>
    <div class="protected-route">
        <h1>Protected Route</h1>
        <p>This is a protected page that can only be accessed by authenticated users.</p>
        <button @click="handleLogout">Logout</button>
    </div>
</template>

<script>
export default {
    name: 'ProtectedView',
    methods: {
        handleLogout() {
            localStorage.removeItem('access_token');
            localStorage.removeItem('token_type');
            this.$store.dispatch('setLoggedIn', false);
            this.$router.push('/login');
        },
    },
};
</script>

<style scoped>
.protected-route {
    text-align: center;
    margin-top: 40px;
}

h1 {
    font-size: 2em;
    margin-bottom: 0.5em;
}

p {
    font-size: 1.2em;
}

button {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 1em;
    cursor: pointer;
}

button:hover {
    background-color: #d32f2f;
}
</style>
