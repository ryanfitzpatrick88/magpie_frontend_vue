import {createRouter, createWebHistory} from 'vue-router';

// Import your components here
import HomeView from '@/components/HomeView.vue';
import LoginView from '@/components/LoginView.vue';
import ProtectedView from '@/components/ProtectedView.vue';
import RegisterView from '@/components/RegisterView.vue';
import UserList from '@/components/UserList.vue';
import UserDetail from '@/components/UserDetail.vue';
import UserEdit from '@/components/UserEdit.vue';
import PreferencesView from '@/components/PreferencesView.vue';
import TransactionList from '@/components/TransactionList.vue';
import TransactionDetail from '@/components/TransactionDetail.vue'
import TransactionImport from '@/components/TransactionImport.vue'
import ImportBatchList from "@/components/ImportBatchList.vue";
import ImportBatchDetail from "@/components/ImportBatchDetail.vue";
import TransactionDuplicates from "@/components/Transaction/TransactionDuplicates.vue";

const routes = [
    {
        path: '/',
        name: 'HomeView',
        component: HomeView,
    },
    {
        path: '/login',
        name: 'LoginView',
        component: LoginView,
    },
    {
        path: '/register',
        name: 'RegisterView',
        component: RegisterView,
    },
    {
        path: '/protected_route',
        name: 'ProtectedView',
        component: ProtectedView,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/preferences',
        name: 'PreferencesView',
        component: PreferencesView,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/users',
        name: 'UserList',
        component: UserList,
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: ':id',
                name: 'UserDetail',
                component: UserDetail,
            },
            {
                path: 'edit/:id',
                name: 'UserEdit',
                component: UserEdit,
            },
        ],
    },
    {
        path: '/transactions',
        name: 'TransactionList',
        component: TransactionList,
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: ':id',
                name: 'TransactionDetail',
                component: TransactionDetail,
            },
        ],
    },
    {
        path: '/import-transactions',
        name: 'TransactionImport',
        component: TransactionImport,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/duplicate-transactions',
        name: 'TransactionDuplicates',
        component: TransactionDuplicates,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/import-batches',
        name: 'ImportBatchList',
        component: ImportBatchList,
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: ':id',
                name: 'ImportBatchDetail',
                component: ImportBatchDetail,
            },
        ],
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!localStorage.getItem('access_token')) {
            next({
                path: '/login',
                query: {redirect: to.fullPath},
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
