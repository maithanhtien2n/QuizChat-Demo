<script setup>
import { mobileScreen, FORMAT } from "@/utils";
import UserMultiCustom from "@/components/user/UserMultiCustom.vue";
import { onMounted, ref, watch } from "vue";

const props = defineProps({
  id: { type: String, required: false, default: "" },
  value: { type: String, required: false, default: "" },
  userData: {
    type: Object,
    required: false,
    default: { avatar: "", fullName: "", userName: "" },
  },
  isDefault: { type: Boolean, required: false, default: false },
});

const emits = defineEmits([
  "onUpdateValue",
  "onOpen",
  "onAddAnswer",
  "onCancel",
]);

const textareaEvent = ref(null);
const isAnswer = ref(props.isDefault);
const localValue = ref(props.value);

const onClickOpenAnswerPost = (fullName) => {
  if (typeof fullName === "string") {
    localValue.value = `@${fullName}: `;
  }
  setTimeout(() => {
    textareaEvent.value?.$el?.focus();
  }, 100);
  isAnswer.value = true;
  emits("onOpen");
};

const onCancel = () => {
  isAnswer.value = false;
  emits("onCancel");
};

watch(
  () => props.value,
  (newVal) => {
    localValue.value = newVal;
  }
);

const onInput = (event) => {
  localValue.value = event.target.value;
  emits("onUpdateValue", localValue.value);
};

const onClickAnswer = () => {
  isAnswer.value = false;
  emits("onCancel");
  emits("onAddAnswer");
};

onMounted(() => {
  setTimeout(() => {
    textareaEvent.value?.$el?.focus();
  }, 100);
});

defineExpose({ onClickOpenAnswerPost, onCancel });
</script>

<template>
  <div v-if="isAnswer" class="flex flex-column gap-2" :id="id">
    <div
      class="text-200 border-1"
      style="border-radius: 2rem; overflow: hidden"
    >
      <div
        class="flex justify-content-between align-items-center gap-2 text-200 pt-2 pb-1 px-3"
        style="border-radius: 2rem"
        @click="isAnswer = true"
      >
        <UserMultiCustom
          :value="{
            avatar: userData?.avatar || '',
            fullName: userData?.fullName || '',
            userName: userData?.email.split('@')[0] || '',
          }"
        />

        <i v-if="!isDefault" class="pi pi-angle-up text-700" />
      </div>

      <div style="border-bottom: 1px solid #ddd" class="mx-3" />

      <Textarea
        v-model="localValue"
        :rows="1"
        :autoResize="true"
        placeholder="Câu trả lời của bạn!"
        class="w-full textarea-custom line-height-3 px-3"
        maxlength="300"
        ref="textareaEvent"
        @input="onInput"
      />
      <div class="flex justify-content-between align-items-end pb-3 px-3">
        <div class="text-500 text-sm">{{ localValue.length || 0 }}/300</div>

        <div class="flex gap-2">
          <Button
            label="Bỏ qua"
            class="px-4 border-round-3xl"
            outlined
            @click="onCancel"
          />
          <Button
            label="Trả lời"
            class="px-4 border-round-3xl"
            @click="onClickAnswer"
          />
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="!isAnswer && !isDefault"
    class="flex align-items-center gap-2 border-1 text-200 py-2 px-3"
    style="border-radius: 2rem"
    @click="onClickOpenAnswerPost"
  >
    <div>
      <img
        :src="userData?.avatar?.base64 || '/images/avatar-default.jpg'"
        onerror="this.onerror=null; this.src='/images/avatar-default.jpg';"
        class="avatar-user"
      />
    </div>

    <div class="text-400 on-click w-full not-blacken">
      <span v-if="localValue" class="text-800">
        {{ FORMAT.truncateString(localValue, mobileScreen ? 30 : 70) }}
      </span>
      <span v-else>Trả lời bài viết ...</span>
    </div>

    <i class="pi pi-angle-down text-700 on-click" />
  </div>
</template>
