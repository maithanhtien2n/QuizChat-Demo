export default [
    {
        path: '/popular',
        name: 'popular',
        meta: { publicPage: true, screenName: 'Phổ biến' },
        component: () => import('@/views/popular/Popular.vue')
    }
];
