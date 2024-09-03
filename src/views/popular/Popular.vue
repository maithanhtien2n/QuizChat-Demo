<script setup>
import EngagementStats from '@/components/common/EngagementStats.vue';
import PostAuthor from '@/components/common/PostAuthor.vue';
import PostItem from '@/components/common/PostItem.vue';
import { StorePopular } from '@/stores';
import { ENUM, mobileScreen } from '@/utils/';
import { useIntersectionObserver } from '@vueuse/core';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import PopularSkeleton from './PopularSkeleton.vue';

const router = useRouter();

const { onGetterPopularPosts, onActionGetPopularPosts } = StorePopular();

const isLoading = ref('');
const loadMore = ref(null);
const hasMoreData = ref(true);
const pageSize = ref(20);
const currentPage = ref(1);

const postTop1 = computed(() => onGetterPopularPosts.value.postTop1 || null);
const postsTop9 = computed(() => onGetterPopularPosts.value.postsTop9 || []);
const postsTop90 = computed(() => onGetterPopularPosts.value.postsTop90 || []);

const onClickOptionItem = () => {};

const onSetHeightRightColumn = () => {
    const leftColumn = document.getElementById('left-column');
    const rightColumn = document.getElementById('right-column');
    if (rightColumn) rightColumn.style.height = leftColumn.clientHeight + 'px';
};

useIntersectionObserver(
    loadMore,
    async ([{ isIntersecting }], observerElement) => {
        if (isIntersecting && hasMoreData.value) {
            isLoading.value = 'loadMore';
            const res = await onActionGetPopularPosts({
                pageSize: pageSize.value,
                currentPage: currentPage.value + 1
            });

            if (+res?.result?.postsTop90?.length < pageSize.value) {
                hasMoreData.value = false;
            }

            onGetterPopularPosts.value.postsTop90 = [...postsTop90.value, ...res?.result?.postsTop90];

            isLoading.value = '';
            currentPage.value++;
        }
    },
    { threshold: 1.0 }
);

onMounted(async () => {
    window.addEventListener('resize', () => {
        onSetHeightRightColumn();
    });

    isLoading.value = 'loadPage';
    await onActionGetPopularPosts({
        pageSize: pageSize.value,
        currentPage: currentPage.value
    });
    isLoading.value = '';
    onSetHeightRightColumn();
});
</script>

<template>
    <PopularSkeleton v-if="isLoading === 'loadPage'" />

    <div v-show="isLoading !== 'loadPage'" class="flex flex-column gap-3">
        <div class="flex w-full gap-3 flex-wrap">
            <div class="flex-1">
                <div v-if="postTop1" id="left-column" class="card flex flex-column gap-2 p-0" style="min-width: 23rem; overflow: hidden">
                    <span class="type-text text-center text-lg font-semibold text-700">
                        {{ $translation('#1 trên tab thịnh hành') }}
                    </span>

                    <img v-if="postTop1?.type === ENUM.POST_TYPE.MEDIA" :src="postTop1?.body?.base64" alt="Lỗi ảnh" :class="[`${mobileScreen ? 'h-13rem' : 'h-15rem'} w-full`]" style="object-fit: contain" />

                    <div class="flex flex-column gap-2 mt-1 px-3">
                        <span
                            class="on-click line-clamp-2 main-color text-lg line-height-2 font-semibold"
                            :class="{
                                'text-2xl mt-6': postTop1?.type === ENUM.POST_TYPE.TEXT && !mobileScreen
                            }"
                            @click="
                                router.push({
                                    name: 'DetailPost',
                                    params: { id: postTop1?._id }
                                })
                            "
                        >
                            {{ postTop1?.title }}
                        </span>

                        <span
                            v-if="postTop1?.type === ENUM.POST_TYPE.TEXT"
                            style="font-size: 0.87rem; text-align: justify; white-space: pre-wrap; overflow-wrap: break-word"
                            class="line-height-2 line-clamp-2"
                            :class="{ 'text-lg': postTop1?.type === ENUM.POST_TYPE.TEXT }"
                            v-html="postTop1?.body"
                        />
                    </div>

                    <div class="px-3 pb-3 flex flex-column gap-2">
                        <EngagementStats :tags="postTop1?.tags" :likerAmount="postTop1?.likerAmount" :answerAmount="postTop1?.answerAmount" :viewsAmount="postTop1?.viewsAmount" />

                        <div class="flex gap-2 align-items-center">
                            <PostAuthor :value="postTop1.author" />
                            <i class="pi pi-circle-fill text-400" style="font-size: 4px" />
                            <span class="text-sm text-700">
                                {{ postTop1?.dateTime === 'vừa xong' ? postTop1?.dateTime : `${postTop1?.dateTime} trước` }}
                            </span>
                        </div>

                        <div v-if="postTop1?.type === ENUM.POST_TYPE.TEXT && !mobileScreen" class="py-4" />
                    </div>
                </div>
            </div>

            <div v-if="!mobileScreen && postsTop9?.length" id="right-column" class="flex-1 p-0" :class="{ card: !mobileScreen }" style="min-width: 23rem; overflow: hidden">
                <div class="type-text flex align-items-center font-semibold text-lg text-700">
                    {{ $translation('Top.9 bài viết phổ biến') }}
                </div>

                <ScrollPanel
                    style="height: 87%"
                    :pt="{
                        wrapper: {
                            style: { 'border-right': '10px solid var(--surface-ground)' }
                        },
                        bary: 'hover:bg-primary-400 bg-primary-300 opacity-100'
                    }"
                >
                    <div class="px-3 pb-3">
                        <PostItem
                            v-for="(item, index) in postsTop9"
                            :key="index"
                            :author="item?.author"
                            :value="item"
                            :options="[]"
                            :type="item.type"
                            :style="{
                                paddingBottom: '1rem',
                                borderBottom: index !== postsTop9.length - 1 ? '1px solid var(--surface-border)' : 'none'
                            }"
                            class="pt-3 mr-3"
                            @onOptionItem="onClickOptionItem"
                        />
                    </div>
                </ScrollPanel>
            </div>

            <div v-if="mobileScreen && postsTop9?.length" class="flex flex-column gap-3">
                <span class="type-text py-2 border-round-sm font-semibold text-lg text-700">
                    {{ $translation('Top.9 bài viết phổ biến') }}
                </span>

                <PostItem
                    v-for="(item, index) in postsTop9"
                    :key="index"
                    :author="item?.author"
                    :value="item"
                    :options="[]"
                    :type="item.type"
                    :style="{
                        paddingBottom: '1rem',
                        borderBottom: index !== postsTop9.length - 1 ? '1px solid var(--surface-border)' : 'none'
                    }"
                    @onOptionItem="onClickOptionItem"
                />
            </div>
        </div>

        <div v-if="postsTop90?.length" class="flex flex-column gap-3">
            <span class="type-text py-2 border-round-sm font-semibold text-lg text-700">
                {{ $translation('Top.90 bài viết phổ biến') }}
            </span>

            <div class="flex flex-column gap-3" :class="{ card: !mobileScreen }">
                <PostItem
                    v-for="(item, index) in postsTop90"
                    :key="index"
                    :author="item?.author"
                    :value="item"
                    :options="[]"
                    :type="item.type"
                    :style="{
                        paddingBottom: '1rem',
                        borderBottom: index !== postsTop90.length - 1 ? '1px solid var(--surface-border)' : 'none'
                    }"
                    @onOptionItem="onClickOptionItem"
                />
                <div v-if="hasMoreData" ref="loadMore" />
                <ProgressSpinner v-if="isLoading === 'loadMore'" class="w-2rem h-2rem" strokeWidth="7" fill="transparent" animationDuration=".4s" aria-label="Custom ProgressSpinner" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.type-text {
    color: rgba(255, 255, 255, 0.966) !important;
    background-color: var(--mainColor);
    padding: 1rem;
}
</style>
