<script setup>
import { ref, watch } from "vue";
import { appLocalStorage } from "@/utils";

const props = defineProps({
  isShow: { type: Boolean, required: false, default: false },
});

const emits = defineEmits(["onClose"]);

const isDisplay = ref(false);

watch(
  () => props.isShow,
  (newVal) => {
    isDisplay.value = newVal;
  }
);

watch(isDisplay, (newVal) => {
  if (newVal) {
    appLocalStorage.value.isScroll = false;
  } else {
    appLocalStorage.value.isScroll = true;
  }
  if (!newVal) emits("onClose", newVal);
});
</script>

<template>
  <Dialog
    v-model:visible="isDisplay"
    modal
    :draggable="false"
    header=" "
    style="width: 25rem"
    class="popupNotification"
  >
    <div class="flex flex-column gap-2 px-3">
      <div style="padding-bottom: 1.8rem">
        <slot />
      </div>
    </div>

    <!-- <div class="flex justify-content-end">
      <Button
        type="button"
        label="Đóng"
        severity="secondary"
        @click="showNotification.isShow = false"
      />
    </div> -->
  </Dialog>
</template>
