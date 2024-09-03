<script setup>
const emits = defineEmits(["onClickClose"]);
</script>

<template>
  <div
    class="fixed top-0 left-0 right-0 bottom-0"
    style="background-color: black; opacity: 0.6; z-index: -1"
    @click="emits('onClickClose')"
  />
</template>
