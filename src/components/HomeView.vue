<template>
    <div class="home">
        <h1>Welcome to the Home Page</h1>
        <p>
            This is the home page of our Vue.js app. Please
            <router-link to="/login">login</router-link>
            to access protected content.
        </p>
    </div>
</template>

<script>
export default {
    name: 'HomeView',
};
</script>

<style scoped>
.home {
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
</style>
