<script setup>
import { ENUM, FORMAT, appLocalStorage } from "@/utils";
</script>

<template>
  <Dropdown
    v-model="appLocalStorage.lang"
    :options="ENUM.LANG_OPTION"
    optionLabel="name"
    optionValue="code"
    class="w-full w-5rem"
    style="padding: 0.1rem 0"
  >
    <template #value="slotProps">
      <div v-if="slotProps.value" class="flex align-items-center">
        <img
          :src="
            FORMAT.getOptionByCode(ENUM.LANG_OPTION, slotProps.value)?.image
          "
          alt="Lỗi ảnh"
          style="width: 20px; height: 13px; object-fit: cover"
        />
      </div>
      <span v-else>
        {{ slotProps.placeholder }}
      </span>
    </template>
    <template #option="slotProps">
      <div class="flex align-items-center gap-2">
        <img
          :src="slotProps.option.image"
          alt="Lỗi ảnh"
          style="width: 20px; height: 13px; object-fit: cover"
        />
        <div>{{ slotProps.option.name }}</div>
      </div>
    </template>
  </Dropdown>
</template>
