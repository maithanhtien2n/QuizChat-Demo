<script setup>
import { mobileScreen, desktopScreen, FORMAT, ENUM } from "@/utils";
import { useRouter } from "vue-router";
import EngagementStats from "@/components/common/EngagementStats.vue";
import Overlay from "@/components/common/Overlay.vue";
import PostAuthor from "@/components/common/PostAuthor.vue";

const router = useRouter();

const props = defineProps({
  author: { type: Object, default: {} },
  value: { type: Object, default: {} },
  optionId: { type: String, default: "" },
  options: { type: Array, default: [] },
  type: { type: String, default: "TEXT" },
  class: { type: String, default: "" },
  style: { type: Object, default: {} },
});

const emits = defineEmits(["onTitle", "onOptionItem"]);

const onClickTitle = (id, status) => {
  router.push({ name: "DetailPost", params: { id } });
  emits("onTitle", { id, status });
};

const onClickOptionItem = (id, optionItem, status) => {
  emits("onOptionItem", { id, optionItem, status });
};
</script>

<template>
  <div :class="props.class" :style="props.style">
    <div v-if="type === ENUM.POST_TYPE.TEXT" class="flex gap-3">
      <div
        class="flex flex-column align-items-end gap-2"
        style="font-size: 0.87rem; margin-top: 0.1rem"
        :style="{
          objectFit: 'cover',
          minWidth: '6.3rem',
          maxWidth: '6.3rem',
        }"
      >
        <span style="white-space: nowrap">
          {{ value?.likerAmount }} {{ $translation("thích") }}
        </span>

        <span style="white-space: nowrap" class="text-500">
          {{ value?.answerAmount }} {{ $translation("trả lời") }}
        </span>
        <span style="white-space: nowrap" class="text-500">
          {{ value?.viewsAmount }} {{ $translation("lượt xem") }}
        </span>
      </div>

      <div class="flex-1 flex gap-2 flex-column">
        <div class="flex justify-content-between gap-3">
          <span
            class="on-click line-clamp-1 main-color text-base line-height-2 font-bold"
            @click="onClickTitle(value._id, value?.status)"
          >
            {{ value?.title }}
          </span>

          <div v-if="options?.length">
            <Overlay>
              <template #button>
                <i class="pi pi-ellipsis-v on-click" />
              </template>

              <template #optionItem>
                <span
                  v-for="(option, index) in FORMAT.onMapTranslation(options)"
                  :key="index"
                  :class="[
                    'p-3 option-item on-click not-blacken',
                    {
                      'text-red-500':
                        option.code === ENUM.POST_ITEM_OPTION[1].code,
                    },
                  ]"
                  style="white-space: nowrap"
                  @click="
                    onClickOptionItem(value._id, option.code, value.status)
                  "
                >
                  {{ option.name }}
                </span>
              </template>
            </Overlay>
          </div>
        </div>

        <span
          style="
            font-size: 0.87rem;
            text-align: justify;
            white-space: pre-wrap;
            overflow-wrap: break-word;
          "
          class="line-height-2 line-clamp-2"
          v-html="value?.body"
        />

        <div class="flex gap-2 align-items-center">
          <PostAuthor v-if="Object.keys(author || {}).length" :value="author" />
          <i
            v-if="Object.keys(author || {}).length"
            class="pi pi-circle-fill text-400"
            style="font-size: 4px"
          />

          <span class="text-sm text-700">
            {{
              value?.dateTime === "vừa xong"
                ? value?.dateTime
                : `${value?.dateTime} trước`
            }}
          </span>
        </div>
      </div>
    </div>

    <div v-if="type === ENUM.POST_TYPE.MEDIA">
      <div class="flex gap-3">
        <img
          :src="value?.body?.base64 || '/images/image-product-default.svg'"
          onerror="this.onerror=null; this.src='/images/image-product-default.svg';"
          class="border-round-lg object-fit-cover box-shadow-1"
          style="width: 6.3rem; height: 7rem"
        />

        <div class="flex-1 flex flex-column gap-2">
          <div class="flex justify-content-between gap-3">
            <span
              class="on-click line-clamp-1 main-color text-base line-height-2 font-bold"
              @click="onClickTitle(value._id, value?.status)"
            >
              {{ value?.title }}
            </span>

            <div v-if="options?.length">
              <Overlay>
                <template #button>
                  <i class="pi pi-ellipsis-v on-click" />
                </template>

                <template #optionItem>
                  <span
                    v-for="(option, index) in options"
                    :key="index"
                    :class="[
                      'p-3 option-item on-click not-blacken',
                      {
                        'text-red-500':
                          option.code === ENUM.POST_ITEM_OPTION[1].code,
                      },
                    ]"
                    style="white-space: nowrap"
                    @click="
                      onClickOptionItem(value._id, option.code, value.status)
                    "
                  >
                    {{ option.name }}
                  </span>
                </template>
              </Overlay>
            </div>
          </div>

          <EngagementStats
            :likerAmount="value?.likerAmount"
            :answerAmount="value?.answerAmount"
            :viewsAmount="value?.viewsAmount"
          />

          <div class="flex gap-2 align-items-center">
            <PostAuthor
              v-if="Object.keys(author || {}).length"
              :value="author"
            />
            <i
              v-if="Object.keys(author || {}).length"
              class="pi pi-circle-fill text-400"
              style="font-size: 4px"
            />
            <span class="text-sm">
              {{
                value?.dateTime === "vừa xong"
                  ? value?.dateTime
                  : `${value?.dateTime} trước`
              }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.option-item:hover {
  background-color: var(--surface-border);
  transition: all 0.3s ease;
}
</style>
