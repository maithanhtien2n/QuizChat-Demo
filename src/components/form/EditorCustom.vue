<script setup>
import { useField } from "vee-validate";

const props = defineProps({
  name: { type: String, required: true, default: "" },
  label: { type: String, required: false, default: "" },
  required: { type: Boolean, default: false },
  class: { type: String, required: false, default: "" },
  style: { type: Object, required: false, default: {} },
  disabled: { type: Boolean, required: false, default: false },
  placeholder: { type: String, required: false, default: "" },
});

const emits = defineEmits(["onChange"]);

const { value, errorMessage } = useField(props.name);
</script>

<template>
  <div class="flex flex-column gap-2">
    <label>
      <span class="font-semibold">{{ props.label }}</span>
      <span v-show="props.required" class="p-error"> *</span>
    </label>

    <div class="flex flex-column gap-1 w-full">
      <Editor
        v-model="value"
        :class="props.class"
        :style="props.style"
        :disabled="props.disabled"
        :placeholder="props.placeholder"
        @change="emits('onChange')"
      >
        <slot name="toolbar" />
      </Editor>

      <small v-show="errorMessage" class="p-error">{{ errorMessage }}</small>
    </div>
  </div>
</template>
