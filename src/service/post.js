export default [
    {
        path: '/post',
        name: 'Post',
        component: () => import('../Post.vue'),
        children: [
            {
                path: 's',
                name: 'MyPost',
                meta: { screenName: 'Bài đăng của tôi' },
                component: () => import('../MyPost.vue')
            },
            {
                path: 'detail/:id',
                name: 'DetailPost',
                meta: { publicPage: true, screenName: 'Chi tiết bài đăng' },
                component: () => import('../DetailPost.vue')
            },
            {
                path: 'create',
                name: 'CreatePost',
                meta: { screenName: 'Tạo bài đăng' },
                component: () => import('../CreatePost.vue')
            },
            {
                path: 'update/:id',
                name: 'UpdatePost',
                meta: { screenName: 'Chỉnh sửa bài đăng' },
                component: () => import('../UpdatePost.vue')
            },
            {
                path: 'draft/:id',
                name: 'DraftPost',
                meta: { screenName: 'Chỉnh sửa bản nháp' },
                component: () => import('../DraftPost.vue')
            },
            {
                path: 'search',
                name: 'SearchPost',
                meta: { publicPage: true, screenName: 'Kết quả tìm kiếm bài viết' },
                component: () => import('../SearchPost.vue')
            }
        ]
    }
];
