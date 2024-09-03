<script setup>
import { mobileScreen } from "@/utils";

const props = defineProps({
  tags: { type: Array, required: false, default: [] },
  likerAmount: { type: Number, required: false, default: null },
  answerAmount: { type: Number, required: false, default: null },
  viewsAmount: { type: Number, required: false, default: null },
});
</script>

<template>
  <div v-if="tags?.length" class="flex gap-2">
    <span
      v-for="(tag, i) in tags.slice(0, mobileScreen ? 3 : 10)"
      :key="i"
      v-tooltip.top="tag"
      class="border-round-sm line-clamp-1 text-center"
      style="
        padding: 0.3rem 0.6rem;
        font-size: 0.87rem;
        background-color: #f1f5f9;
        white-space: nowrap;
      "
      v-html="tag"
    />

    <span v-if="mobileScreen && tags?.length > 2" style="padding-top: 0.47rem">
      ...
    </span>
  </div>

  <div class="flex gap-3" style="font-size: 0.87rem">
    <span class="text-sm">{{ likerAmount }} {{ $translation("thích") }}</span>
    <span class="text-500">
      {{ answerAmount }} {{ $translation("trả lời") }}
    </span>
    <span class="text-500">
      {{ viewsAmount }} {{ $translation("lượt xem") }}
    </span>
  </div>
</template>
