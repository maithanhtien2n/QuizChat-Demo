<script setup>
const props = defineProps({
  value: { type: Object, required: false, default: {} },
});
</script>

<template>
  <div class="flex gap-1 align-items-center">
    <img
      :src="value?.avatar?.base64 || '/images/avatar-default.jpg'"
      class="border-circle"
      style="width: 1.3rem; height: 1.3rem; object-fit: cover"
      onerror="this.onerror=null; this.src='/images/avatar-default.jpg';"
    />

    <span class="text-sm line-clamp-1" style="max-width: 6rem">
      {{ value?.fullName || "Ko tên" }}
    </span>
  </div>
</template>
