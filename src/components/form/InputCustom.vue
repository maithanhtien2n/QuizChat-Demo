<script setup>
import { useField } from "vee-validate";

const props = defineProps({
  name: { type: String, required: true, default: "" },
  label: { type: String, required: false, default: "" },
  required: { type: Boolean, required: false, default: false },
  maxlength: { type: Number, required: false, default: 200 },
  placeholder: { type: String, required: false, default: "" },
  autocomplete: { type: Boolean, required: false, default: false },
  class: { type: String, required: false, default: "" },
  style: { type: Object, required: false, default: {} },
  disabled: { type: Boolean, required: false, default: false },
  type: { type: String, required: false, default: "text" },
});

const emits = defineEmits(["onChange", "onInput"]);

const { value, errorMessage, setValue } = useField(props.name);

const onInputUpdatePassword = (event) => {
  setValue(event.target.value);
  emits("onInput");
};
</script>

<template>
  <div class="w-full flex flex-column gap-2">
    <label v-show="props.label">
      <span class="font-semibold">{{ props.label }}</span>
      <span v-show="props.required" class="p-error"> *</span>
    </label>

    <div v-if="!autocomplete" style="position: absolute; top: -9999px">
      <input type="text" />
      <input type="password" />
    </div>

    <div
      class="flex flex-column gap-1 w-full"
      :class="{ 'p-disabled': props.disabled }"
    >
      <InputText
        v-if="props.type === 'text'"
        type="text"
        v-model="value"
        :class="props.class"
        :style="props.style"
        :maxlength="props.maxlength"
        :placeholder="props.placeholder"
        @input="emits('onInput')"
        @change="emits('onChange')"
      />

      <InputText
        v-if="props.type === 'number'"
        type="text"
        v-model="value"
        :class="props.class"
        :style="props.style"
        :maxlength="props.maxlength"
        :placeholder="props.placeholder"
        @input="emits('onInput')"
        @change="emits('onChange')"
        onkeydown="
            return (
            event.key >= 0 ||
            event.key == 'Backspace' ||
            event.key == 'Tab');"
      />

      <Password
        v-if="props.type === 'password'"
        v-model="value"
        :class="props.class"
        :style="props.style"
        :placeholder="props.placeholder"
        :feedback="false"
        toggleMask
        inputClass="w-full"
        @input="onInputUpdatePassword"
        @change="emits('onChange')"
      />
      <small v-show="errorMessage" class="p-error">{{ errorMessage }}</small>
    </div>
  </div>
</template>
