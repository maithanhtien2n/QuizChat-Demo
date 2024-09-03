import AppLayout from '@/layout/AppLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

// import RoutesAuth from './auth';
// import RoutesPage from './page';
import RoutesPopular from './popular';
// import RoutesPost from './post';
// import RoutesProfile from './profile';
// import RoutesSetting from './setting';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'Home',
                    component: () => import('@/views/Home.vue')
                },
                ...RoutesPopular
            ]
        }
        // ...RoutesAuth,
        // ...RoutesPage
    ]
});

export default router;
