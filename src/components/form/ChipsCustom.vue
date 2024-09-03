<script setup>
import { useField } from "vee-validate";

const props = defineProps({
  name: { type: String, required: true, default: "" },
  label: { type: String, required: false, default: "" },
  required: { type: Boolean, required: false, default: false },
  class: { type: String, required: false, default: "" },
  style: { type: Object, required: false, default: {} },
  disabled: { type: Boolean, required: false, default: false },
  placeholder: { type: String, required: false, default: "" },
  separator: { type: String, required: false, default: "," },
});

const emits = defineEmits(["onChange", "onEnter"]);

const { value, errorMessage } = useField(props.name);
</script>

<template>
  <div class="flex flex-column gap-2">
    <label>
      <span class="font-semibold">{{ props.label }}</span>
      <span v-show="props.required" class="p-error"> *</span>
    </label>

    <div
      class="flex flex-column gap-1 w-full"
      :class="{ 'p-disabled': props.disabled }"
    >
      <Chips
        v-model="value"
        :class="props.class"
        :style="props.style"
        :separator="props.separator"
        :placeholder="props.placeholder"
        @change="emits('onChange')"
        @keydown.enter="emits('onEnter')"
      />

      <small v-show="errorMessage" class="p-error">{{ errorMessage }}</small>
    </div>
  </div>
</template>
