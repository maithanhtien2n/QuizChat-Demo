<script setup>
import { onMounted, ref } from "vue";
const props = defineProps({
  iconClass: { type: String, required: false, default: "" },
  optionClass: { type: String, required: false, default: "" },
});

const emits = defineEmits(["onButton"]);

const overlayRef = ref(null);
const showOverlay = ref(false);

const onClickButton = () => {
  showOverlay.value = true;
  emits("onButton");
};

const handleClickOutside = (event) => {
  if (overlayRef.value && !overlayRef.value.contains(event.target)) {
    showOverlay.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});
</script>

<template>
  <div :class="props.iconClass" class="relative">
    <div @click="onClickButton" ref="overlayRef">
      <slot name="button" />
    </div>

    <div
      v-if="showOverlay"
      :class="props.optionClass"
      class="option absolute flex flex-column bg-white right-0 card p-0 overflow-hidden"
      style="top: 100%"
    >
      <slot name="optionItem" />
    </div>
  </div>
</template>
