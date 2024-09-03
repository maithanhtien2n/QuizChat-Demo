export default [
    {
        path: '/setting',
        component: () => import('../Setting.vue'),
        children: [
            {
                path: 'screen',
                name: 'Screen',
                meta: { screenName: 'Cài đặt Màn hình' },
                component: () => import('../Screen.vue')
            },
            {
                path: 'change-password',
                name: 'ChangePassword',
                meta: { screenName: 'Thay đổi mật khẩu' },
                component: () => import('../ChangePassword.vue')
            }
        ]
    }
];
