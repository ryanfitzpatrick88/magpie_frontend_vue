import {createRouter, createWebHistory} from 'vue-router';

// Import your components here
import HomeView from '@/components/HomeView.vue';
import LoginView from '@/components/Auth/LoginView.vue';
import ProtectedView from '@/components/ProtectedView.vue';
import RegisterView from '@/components/Auth/RegisterView.vue';
import UserList from '@/components/Admin/UserList.vue';
import UserDetail from '@/components/Admin/UserDetail.vue';
import UserEdit from '@/components/Admin/UserEdit.vue';
import PreferencesView from '@/components/PreferencesView.vue';
import TransactionList from '@/components/Transaction/TransactionList.vue';
import TransactionDetail from '@/components/Transaction/TransactionDetail.vue'
import TransactionImport from '@/components/Transaction/TransactionImport.vue'
import ImportBatchList from "@/components/ImportBatchList.vue";
import ImportBatchDetail from "@/components/ImportBatchDetail.vue";
import TransactionDuplicates from "@/components/Tools/TransactionDuplicates.vue";
import UserAccountList from "@/components/Admin/UserAccountList.vue";
import UserAccountDetail from "@/components/Admin/UserAccountDetail.vue";
import UserAccountEdit from "@/components/Admin/UserAccountEdit.vue";

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
        path: '/user-accounts',
        name: 'UserAccountList',
        component: UserAccountList,
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: ':id',
                name: 'UserAccountDetail',
                component: UserAccountDetail,
            },
            {
                path: 'edit/:id',
                name: 'UserAccountEdit',
                component: UserAccountEdit,
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
