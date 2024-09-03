<script setup>
import { ENUM } from "@/utils";

const props = defineProps({
  type: { type: String, required: false, default: ENUM.POST_TYPE.TEXT },
});
</script>

<template>
  <div v-if="type === ENUM.POST_TYPE.TEXT" class="flex gap-3">
    <div class="flex flex-column gap-2 align-items-end">
      <Skeleton class="w-3rem" style="height: 0.5rem" />
      <Skeleton class="w-4rem" style="height: 0.5rem" />
      <Skeleton class="w-5rem" style="height: 0.5rem" />
    </div>

    <div class="flex-1 flex gap-2 flex-column">
      <Skeleton class="w-full h-1rem" />
      <Skeleton class="w-full h-2rem" />

      <div class="flex gap-2">
        <Skeleton
          v-for="(_, index) in 3"
          :key="index"
          class="w-4rem"
          style="height: 1.4rem"
        />
      </div>

      <div class="flex align-items-center gap-1">
        <Skeleton class="border-circle" style="width: 1.3rem; height: 1.3rem" />
        <Skeleton class="w-6rem h-1rem" />
      </div>
    </div>
  </div>

  <div v-if="type === ENUM.POST_TYPE.MEDIA" class="flex gap-3">
    <Skeleton class="h-7rem" style="width: 6.3rem" />

    <div class="flex-1 flex gap-2 flex-column">
      <Skeleton class="w-full h-1rem" />
      <Skeleton class="w-full h-2rem" />

      <div class="flex gap-2">
        <Skeleton
          v-for="(_, index) in 3"
          :key="index"
          class="w-4rem"
          style="height: 1.4rem"
        />
      </div>

      <div class="flex align-items-center gap-1">
        <Skeleton class="border-circle" style="width: 1.3rem; height: 1.3rem" />
        <Skeleton class="w-6rem h-1rem" />
      </div>
    </div>
  </div>
</template>
