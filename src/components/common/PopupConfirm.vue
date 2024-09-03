<script setup>
import { ref, watch } from "vue";
import { appLocalStorage } from "@/utils";

const props = defineProps({
  rejectLabel: { type: String, required: false, default: "Hủy bỏ" },
  acceptLabel: { type: String, required: false, default: "Đồng ý" },
  rejectClass: {
    type: String,
    required: false,
    default: "p-button-secondary p-button-outlined",
  },
  acceptClass: { type: String, required: false, default: "p-button-danger" },
  message: { type: String, required: false, default: "" },
});

const emits = defineEmits(["onReject", "onAccept"]);

const itemId = ref("");
const showPopup = ref(false);

const onShowPopup = (id) => {
  itemId.value = id;
  showPopup.value = true;
};

const onClickRejectClass = () => {
  showPopup.value = false;
  emits("onReject", itemId.value);
  itemId.value = "";
};

const onClickAcceptClass = () => {
  showPopup.value = false;
  emits("onAccept", itemId.value);
  itemId.value = "";
};

watch(showPopup, (newVal) => {
  if (newVal) {
    appLocalStorage.value.isScroll = false;
  } else {
    appLocalStorage.value.isScroll = true;
  }
});

defineExpose({ onShowPopup, onClickRejectClass, onClickAcceptClass });
</script>

<template>
  <Dialog
    v-model:visible="showPopup"
    modal
    :draggable="false"
    header=" "
    style="width: 25rem"
  >
    <div class="flex flex-column gap-2 px-3">
      <slot name="icon" />

      <div class="line-height-3 text-center pt-1 pb-3">
        {{ message }}
      </div>
    </div>

    <div class="w-full flex justify-content-end">
      <div class="flex gap-2">
        <Button
          :label="rejectLabel"
          :class="rejectClass"
          @click="onClickRejectClass"
        />
        <Button
          :label="acceptLabel"
          :class="acceptClass"
          @click="onClickAcceptClass"
        />
      </div>
    </div>
  </Dialog>
</template>
