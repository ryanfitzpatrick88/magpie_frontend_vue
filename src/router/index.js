import {createRouter, createWebHistory} from 'vue-router';

// Import your components here
import HomeView from '../components/HomeView.vue';
import LoginView from '../components/Auth/LoginView.vue';
import ProtectedView from '../components/ProtectedView.vue';
import RegisterView from '../components/Auth/RegisterView.vue';
import UserList from '../components/Admin/UserList.vue';
import UserDetail from '../components/Admin/UserDetail.vue';
import UserEdit from '../components/Admin/UserEdit.vue';
import PreferencesView from '../components/PreferencesView.vue';
import TransactionList from '../components/Transaction/TransactionList.vue';
import TransactionDetail from '../components/Transaction/TransactionDetail.vue'
import TransactionImport from '../components/Tools/TransactionImport.vue'
import ImportBatchList from "../components/Tools/ImportBatchList.vue";
import ImportBatchDetail from "../components/Tools/ImportBatchDetail.vue";
import TransactionDuplicates from "../components/Tools/TransactionDuplicates.vue";
import UserAccountList from "../components/Admin/UserAccountList.vue";
import UserAccountDetail from "../components/Admin/UserAccountDetail.vue";
import UserAccountEdit from "../components/Admin/UserAccountEdit.vue";
import BankAccountList from "../components/BankAccount/BankAccountList.vue";
import BankAccountDetail from "../components/BankAccount/BankAccountDetail.vue";
import BankAccountEdit from "../components/BankAccount/BankAccountEdit.vue";
import CategoryDetail from "@/components/Category/CategoryDetail.vue";
import CategoryList from "@/components/Category/CategoryList.vue";
import CategoryEdit from "@/components/Category/CategoryEdit.vue";
import MerchantList from "@/components/Merchant/MerchantList.vue";
import MerchantDetail from "@/components/Merchant/MerchantDetail.vue";
import MerchantEdit from "@/components/Merchant/MerchantEdit.vue";

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
        path: '/bank-accounts',
        name: 'BankAccountList',
        component: BankAccountList,
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: ':id',
                name: 'BankAccountDetail',
                component: BankAccountDetail,
            },
            {
                path: 'edit/:id',
                name: 'BankAccountEdit',
                component: BankAccountEdit,
            },
        ],
    },
    {
        path: '/merchants',
        name: 'MerchantList',
        component: MerchantList,
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: ':id',
                name: 'MerchantDetail',
                component: MerchantDetail,
            },
            {
                path: 'edit/:id',
                name: 'MerchantEdit',
                component: MerchantEdit,
            },
        ],
    },
    {
        path: '/categories',
        name: 'CategoryList',
        component: CategoryList,
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: ':id',
                name: 'CategoryDetail',
                component: CategoryDetail,
            },
            {
                path: 'edit/:id',
                name: 'CategoryEdit',
                component: CategoryEdit,
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
    history: createWebHistory(),
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
