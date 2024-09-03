export default [
    {
        path: '/profile',
        name: 'Profile',
        meta: { screenName: 'Trang cá nhân' },
        component: () => import('../Profile.vue')
    }
];
