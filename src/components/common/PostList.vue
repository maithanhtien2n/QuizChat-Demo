<script setup>
import { innerWidth, FORMAT, ENUM } from "@/utils";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  values: { type: Array, required: false, default: [] },
  type: { type: String, required: false, default: "TEXT" },
});

const onClickTitle = (id, status) => {
  if (status === ENUM.POST_STATUS.PUBLIC) {
    router.push({ name: "DetailPost", params: { id } });
    return;
  }

  if (status === ENUM.POST_STATUS.DRAFT) {
    router.push({ name: "DraftPost", params: { id } });
    return;
  }
};
</script>

<template>
  <div
    v-for="(item, index) in values"
    :key="index"
    :class="[
      `${index !== values.length - 1 ? 'pb-3' : ''} ${
        index !== 0 ? 'pt-3' : ''
      }`,
    ]"
    :style="{
      overflow: 'hidden',
      borderBottom:
        index !== values.length - 1
          ? '1px solid var(--surface-border)'
          : 'none',
    }"
  >
    <div
      v-if="type === 'TEXT'"
      :class="[`flex gap-3 ${innerWidth > 700 ? 'pr-8' : ''}`]"
    >
      <div
        class="flex flex-column align-items-end gap-2"
        style="font-size: 0.87rem; margin-top: 0.1rem"
      >
        <span style="white-space: nowrap">{{ item?.likerAmount }} like</span>

        <span style="white-space: nowrap" class="text-500">
          {{ item?.answerAmount }} answers
        </span>
        <span style="white-space: nowrap" class="text-500">
          {{ item?.viewsAmount }} view
        </span>
      </div>

      <div class="flex-1 flex gap-2 flex-column">
        <span
          class="main-color text-base on-click line-height-2 line-clamp-2 font-bold"
          @click="onClickTitle(item._id, item?.status)"
        >
          {{ item?.title }}
        </span>

        <span
          style="
            font-size: 0.87rem;
            text-align: justify;
            white-space: pre-wrap;
            overflow-wrap: break-word;
          "
          class="line-height-2 line-clamp-2"
          v-html="item?.body"
        />

        <div class="flex gap-2 mt-1">
          <span
            v-for="(tag, i) in item?.tags.slice(0, innerWidth < 550 ? 2 : 10)"
            :key="i"
            v-tooltip.top="tag"
            class="border-round-sm line-clamp-1"
            style="
              padding: 0.3rem 0.6rem;
              font-size: 0.87rem;
              background-color: #f1f5f9;
              white-space: nowrap;
            "
            v-html="FORMAT.truncateString(tag, innerWidth < 550 ? 13 : 30)"
          />
          <span
            v-if="innerWidth < 550 && item?.tags?.length > 2"
            style="padding-top: 0.47rem"
          >
            ...
          </span>
        </div>
      </div>
    </div>

    <div v-if="type === 'MEDIA'">
      <div class="flex gap-3">
        <img
          :src="item?.body || '/images/image-product-default.svg'"
          onerror="this.onerror=null; this.src='/images/image-product-default.svg';"
          class="w-8rem h-8rem border-round-lg"
          :style="{
            objectFit: 'cover',
            minWidth: '6rem',
            minHeight: '6rem',
            maxWidth: `${innerWidth < 500 ? '6' : '8'}rem`,
            maxHeight: `${innerWidth < 500 ? '7' : '8'}rem`,
          }"
        />

        <div class="flex flex-column gap-2">
          <span
            class="main-color text-base on-click line-height-2 line-clamp-2 font-bold"
            @click="onClickTitle(item._id, item?.status)"
          >
            {{ item?.title }}
          </span>

          <div class="flex gap-2">
            <span
              v-for="(tag, i) in item?.tags.slice(0, innerWidth < 550 ? 2 : 10)"
              :key="i"
              v-tooltip.top="tag"
              class="border-round-sm line-clamp-1 text-center"
              style="
                padding: 0.3rem 0.6rem;
                font-size: 0.87rem;
                background-color: #f1f5f9;
                white-space: nowrap;
              "
              v-html="FORMAT.truncateString(tag, 20)"
            />
          </div>

          <div
            class="flex gap-3"
            style="font-size: 0.87rem; margin-top: 0.1rem"
          >
            <span style="white-space: nowrap">
              {{ item?.likerAmount }} like
            </span>

            <span style="white-space: nowrap" class="text-500">
              {{ item?.answerAmount }} answers
            </span>

            <span style="white-space: nowrap" class="text-500">
              {{ item?.viewsAmount }} view
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="!values?.length" class="text-center py-8">
    Chưa có bài viết nào.
  </div>
</template>
