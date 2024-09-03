<script setup>
import { ref } from "vue";
import { useField } from "vee-validate";
import { mobileScreen, FORMAT } from "@/utils";

const props = defineProps({
  name: { type: String, required: true, default: "" },
  label: { type: String, required: false, default: "" },
  class: { type: String, required: false, default: "w-12rem h-12rem" },
  style: { type: Object, required: false, default: () => {} },
  disabled: { type: Boolean, required: false, default: false },
  miniSize: { type: Boolean, required: false, default: false },
  required: { type: Boolean, required: false, default: true },
  maxSize: { type: Number, required: false, default: 100 },
  accept: { type: String, required: false, default: "video" },
  type: { type: String, required: false, default: "JPG,JPEG,PNG" },
});

const emits = defineEmits(["onUpload", "onDelete"]);

const isLoading = ref(false);

const { value, errorMessage, setErrors, setValue } = useField(props.name);

const validate = (event) => {
  const file = event.target.files[0];
  const fileType = file.name.split(".").pop().toLowerCase();
  if (!props.type.toLowerCase().includes(fileType)) {
    return "Tệp không đúng định dạng!";
  }

  if (+FORMAT.convertByteToMB(file.size) > +props?.maxSize) {
    return `Kích thước tệp không được vượt quá ${props?.maxSize}MB`;
  }

  return null;
};

const onUpload = async (event) => {
  if (validate(event)) {
    setErrors(validate(event));
    return;
  }

  const file = event.target.files[0];
  if (!file) {
    setErrors("Không có tệp nào được chọn!");
    return;
  }

  isLoading.value = true;

  try {
    const maxSize = 3145728; // 3MB
    FORMAT.resizeImage(event.target.files[0], maxSize, (resizedBlob) => {
      const reader = new FileReader();
      reader.readAsDataURL(resizedBlob);
      reader.onload = (e) => {
        if (e.target.result) {
          setValue({
            name: event.target.files[0].name,
            base64: e.target.result,
          });
        }
      };

      isLoading.value = false;
      emits("onUpload", event);
    });
  } catch (error) {
    setErrors(error);
    isLoading.value = false;
  }
};

const onDelete = (value) => {
  setValue(null);
  emits("onDelete", value);
};
</script>

<template>
  <div
    class="flex flex-column gap-2"
    :class="`${mobileScreen ? 'w-full' : ''}`"
  >
    <label v-show="props.label">
      <span class="font-semibold">{{ props.label }}</span>
      <span v-show="props.required" class="p-error"> *</span>
    </label>

    <div class="flex flex-column gap-1">
      <div
        :class="[
          'relative border-1 border-dashed main-color flex align-items-center justify-content-center',
          props.class,
        ]"
        :style="{ overflow: 'hidden', minHeight: '7rem', ...props.style }"
      >
        <div v-if="isLoading" class="flex flex-column gap-1">
          <ProgressSpinner
            style="width: 40px; height: 40px"
            strokeWidth="5"
            animationDuration=".5s"
          />
          <span class="text-sm">Đang tải...</span>
        </div>

        <!-- Upload -->
        <div v-if="!value && !isLoading">
          <div class="w-full flex flex-column gap-1 align-items-center">
            <i class="pi pi-camera text-3xl" />
            <span class="text-sm">Thêm tệp tin</span>
          </div>

          <input
            type="file"
            :accept="props.accept"
            @drop.prevent="onDropPrevent"
            @change="onUpload"
            class="absolute left-0 right-0 bottom-0 on-click"
            style="top: -2rem"
          />
        </div>

        <!-- Preview -->
        <div v-if="value && !isLoading">
          <img
            v-if="
              value.base64.split('/')[0].split(':').pop() === 'image' ||
              value.base64.includes('http')
            "
            :src="value.base64 || '/images/avatar-default.jpg'"
            onerror="this.onerror=null; this.src='/images/avatar-default.jpg';"
            class="w-full"
            style="object-fit: contain"
          />

          <video
            v-if="value.base64.split('/')[0].split(':').pop() === 'video'"
            class="w-full h-full"
            controls
          >
            <source :src="value.base64" type="video/mp4" />
          </video>

          <i
            style="background-color: rgba(240, 248, 255, 0.767)"
            class="pi pi-times absolute top-0 right-0 p-1 border-round-lg on-click z-5"
            @click="onDelete(value)"
          />
        </div>
      </div>

      <small class="p-error">{{ errorMessage }}</small>
    </div>
  </div>
</template>
