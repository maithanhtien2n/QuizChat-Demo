<script setup>
import { computed, ref, watch } from "vue";

const visible = ref(false);

const props = defineProps({
  icon: { type: String, required: false, default: "" },
  title: { type: String, required: false, default: "" },
  position: { type: String, required: false, default: "right" },
  style: { type: Object, required: false, default: {} },
});

const desktopScreen = computed(() =>
  ["right", "left"].includes(props.position)
);

const sidebarStyle = computed(() => {
  return {
    ...props?.style,
    overflow: "hidden",
    maxHeight: desktopScreen.value ? "100%" : "70%",
    height: desktopScreen.value ? "100%" : "auto",
    borderRadius: desktopScreen.value
      ? "0"
      : props.position === "top"
      ? "0 0 0.8rem 0.8rem"
      : "0.8rem 0.8rem 0 0",
  };
});

const onCloseSidebar = () => {
  visible.value = false;
};

watch(visible, (newVal) => {
  if (newVal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

defineExpose({ onCloseSidebar });
</script>

<template>
  <div @click="visible = true">
    <slot name="media" />
  </div>

  <Sidebar v-model:visible="visible" :position="position" :style="sidebarStyle">
    <template #header>
      <div class="w-full p-3 py-2 box-shadow-1">
        <slot name="header" />
      </div>
    </template>

    <slot name="body" />

    <div class="sticky bottom-0 left-0 right-0 py-2 bg-white">
      <slot name="footer" />
    </div>
  </Sidebar>
</template>
