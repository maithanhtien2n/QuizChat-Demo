<script setup>
const props = defineProps({
  value: { type: Object, required: false, default: {} },
  commentActive: { type: String, required: false, default: "" },
  isSelect: { type: Boolean, required: false, default: false },
});

const emits = defineEmits([
  "onAnswerComment",
  "onOpenComment",
  "onCancel",
  "onViewComment",
]);
</script>

<template>
  <div class="flex gap-2">
    <div>
      <img
        :src="value?.avatar?.base64 || '/images/avatar-default.jpg'"
        onerror="this.onerror=null; this.src='/images/avatar-default.jpg';"
        class="avatar-user"
      />
    </div>

    <div class="w-full flex flex-column gap-2">
      <div class="flex flex-column">
        <div class="flex gap-2 align-items-end">
          <span class="font-semibold text-800 on-click">
            {{ value?.fullName }}
          </span>

          <span v-if="value?.time" class="text-sm text-600">
            {{ value?.time }}
          </span>
        </div>

        <span
          v-if="value?.userName"
          class="text-sm text-600"
          style="line-height: 1.14rem"
        >
          @{{ value?.userName }}
        </span>
      </div>

      <div>
        <div
          v-if="value?.body"
          v-html="value?.body"
          :class="[
            `${
              value.time === 'vừa xong' ? 'box-shadow-4' : ''
            } surface-100 inline-flex px-2 py-2 border-round-lg line-height-3`,
            { 'main-border-color': isSelect },
          ]"
          style="white-space: pre; white-space: pre-wrap"
        />
      </div>

      <slot v-if="value?.body" name="comment" />
    </div>
  </div>
</template>
