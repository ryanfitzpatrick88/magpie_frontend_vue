<template>
    <router-link class="nav-link" :to="to" v-if="show">
        <font-awesome-icon :icon="icon"/>
        {{ label }}
    </router-link>
</template>

<script>
export default {
    props: {
        to: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        show: {
            type: Boolean,
            default: true
        },
        icon: {
            type: String,
            required: true
        }
    }
};
</script>

<style scoped>
.nav-link {
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: color 0.3s ease;
}

.nav-link:hover {
    color: #42b983;
}

.nav-link font-awesome-icon {
    margin-right: 5px;
}
</style>
