export default [
    {
        path: '/sign-in',
        name: 'SignIn',
        meta: { publicPage: true },
        component: () => import('@/views/pages/auth/Login.vue')
    },
    {
        path: '/sign-up',
        name: 'SignUp',
        meta: { publicPage: true },
        component: () => import('@/views/pages/auth/Login.vue')
    }
];
