<script setup>
import { watch } from "vue";
import { appLocalStorage } from "@/utils";
import { StoreApp } from "@/services/stores";

const { onGetterShowNotification: showNotification } = StoreApp();

watch(
  () => showNotification.value.isShow,
  (newVal) => {
    if (newVal) {
      appLocalStorage.value.isScroll = false;
    } else {
      appLocalStorage.value.isScroll = true;
    }
  }
);
</script>

<template>
  <Dialog
    v-model:visible="showNotification.isShow"
    modal
    :draggable="false"
    header=" "
    style="width: 25rem"
    class="popupNotification"
  >
    <div class="flex flex-column gap-2 px-3" style="padding-bottom: 1.8rem">
      <i
        v-if="showNotification.icon !== 'NO_ICON'"
        :class="[
          `pi text-center text-3xl ${
            showNotification.type === 'error' ? 'p-error' : 'main-color'
          }`,
          showNotification.icon,
        ]"
      />

      <div class="line-height-3 text-center">
        {{ showNotification.message }}
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
