<script setup>
import { useField } from "vee-validate";

const props = defineProps({
  name: { type: String, required: true, default: "" },
  label: { type: String, required: false, default: "" },
  required: { type: Boolean, required: false, default: false },
  options: { type: Array, required: true, default: [] },
  optionLabel: { type: String, required: false, default: "name" },
  optionValue: { type: String, required: false, default: "code" },
  class: { type: String, required: false, default: "" },
  style: { type: Object, required: false, default: {} },
  disabled: { type: Boolean, required: false, default: false },
  placeholder: { type: String, required: false, default: "" },
});

const emits = defineEmits(["onChange"]);

const { value, errorMessage } = useField(props.name);
</script>

<template>
  <div class="w-full flex flex-column gap-2">
    <label v-show="props.label">
      <span class="font-semibold">{{ props.label }}</span>
      <span v-show="props.required" class="p-error"> *</span>
    </label>

    <div class="flex flex-column gap-1 w-full">
      <Dropdown
        v-model="value"
        :options="props.options"
        :optionLabel="props.optionLabel"
        :optionValue="props.optionValue"
        :placeholder="props.placeholder"
        :class="props.class"
        :style="props.style"
        :disabled="props.disabled"
        @change="emits('onChange')"
      />
      <small v-show="errorMessage" class="p-error">{{ errorMessage }}</small>
    </div>
  </div>
</template>
