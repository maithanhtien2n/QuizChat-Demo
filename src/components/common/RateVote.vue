<script setup>
import { computed } from "vue";
import { ENUM } from "@/utils";

const props = defineProps({
  value: { type: Object, required: false, default: {} },
  size: { type: Number, required: false, default: 1 },
});

const emits = defineEmits(["onPlus", "onMinus"]);

const sizeOption = computed(() => {
  switch (props.size) {
    case 2:
      return {
        wh: "w-3rem h-3rem",
        fz: "text-lg",
      };
    case 3:
      return {
        wh: "w-4rem h-4rem",
        fz: "text-2xl",
      };
    default:
      return {
        wh: "",
        fz: "text-sm",
      };
  }
});
</script>

<template>
  <div>
    <div
      :class="[
        `inline-flex gap-3 align-items-center ${
          size === 1 ? '' : 'main-border-color p-1'
        }`,
      ]"
      style="border-radius: 3rem"
    >
      <i
        :class="[
          `${sizeOption?.wh} ${sizeOption?.fz} ${
            value?.reactionType === ENUM.REACTION_TYPE.PLUS
              ? `${size === 1 ? 'main-color' : 'main-bg-color text-white'}`
              : `${size === 1 ? '' : 'surface-100'}`
          } pi pi-arrow-up on-click border-circle flex justify-content-center align-items-center`,
        ]"
        @click="emits('onPlus')"
      />

      <span :class="[`${sizeOption?.fz} font-semibold not-blacken`]">
        {{ value?.likerAmount || 0 }}
      </span>

      <i
        :class="[
          `${sizeOption?.wh} ${sizeOption?.fz}  ${
            value?.reactionType === ENUM.REACTION_TYPE.MINUS
              ? `${size === 1 ? 'main-color' : 'main-bg-color text-white'}`
              : `${size === 1 ? '' : 'surface-100'}`
          } pi pi-arrow-down on-click border-circle flex justify-content-center align-items-center`,
        ]"
        @click="emits('onMinus')"
      />
    </div>
  </div>
</template>
