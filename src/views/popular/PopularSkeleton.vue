<script setup>
import PostItemSkeleton from '@/components/common/PostItemSkeleton.vue';
import { ENUM, mobileScreen } from '@/utils';
</script>

<template>
    <div class="flex flex-column gap-3">
        <div class="flex w-full gap-3 flex-wrap">
            <Skeleton class="flex-1 h-23rem" />
            <Skeleton v-if="!mobileScreen" class="flex-1 h-23rem" />
        </div>

        <Skeleton class="w-13rem" style="height: 1.5rem" />
        <PostItemSkeleton v-for="_index in 3" :key="_index" :type="ENUM.POST_TYPE.MEDIA" />
    </div>
</template>
