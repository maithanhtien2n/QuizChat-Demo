import PopularService from '@/service';
import { RESPONSE } from '@/utils/response';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const StorePopular = defineStore('StorePopular', () => {
    const { setup } = RESPONSE();

    const popularPosts = ref({});

    const onGetterPopularPosts = computed(() => popularPosts);

    const onActionGetPopularPosts = async (data) => {
        console.log(PopularService);

        const res = await setup({
            apiFunction: PopularService.getPopularPosts(data),
            isLoading: false
        });

        if (res.result.postTop1 && res.result.postsTop9?.length) {
            popularPosts.value = res.result;
        }
        return res;
    };

    return { onGetterPopularPosts, onActionGetPopularPosts };
});
