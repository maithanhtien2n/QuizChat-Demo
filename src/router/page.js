export default [
    {
        path: '/pages/notfound',
        name: 'notfound',
        meta: { publicPage: true },
        component: () => import('@/views/pages/NotFound.vue')
    }
];
