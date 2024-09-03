<script setup>
import { ref, onMounted, computed } from "vue";
import { mobileScreen } from "@/utils";

const props = defineProps({
  id: { type: String, default: "" },
  content: { type: Array, default: [] },
  type: { type: String, default: "small" },
});

const isShowBtn = ref(false);
const storiesContent = ref(null);
const previousBtn = ref(null);
const nextBtn = ref(null);
const itemsContainer = ref(null);

const isSmall = computed(() => props.type === "small");

const scrollNext = () => {
  if (storiesContent.value) {
    storiesContent.value.scrollLeft += 500;
  }
};

const scrollPrevious = () => {
  if (storiesContent.value) {
    storiesContent.value.scrollLeft -= 500;
  }
};

const handleScroll = () => {
  if (storiesContent.value.scrollLeft <= 24) {
    previousBtn.value.classList.remove("active");
  } else {
    previousBtn.value.classList.add("active");
  }

  let maxScrollValue =
    storiesContent.value.scrollWidth - storiesContent.value.clientWidth - 24;

  if (storiesContent.value.scrollLeft >= maxScrollValue) {
    nextBtn.value.classList.remove("active");
  } else {
    nextBtn.value.classList.add("active");
  }
};

onMounted(() => {
  storiesContent.value = document.getElementById(props.id);
  previousBtn.value = document.querySelector(
    `.previous-btn${isSmall.value ? "2" : ""}`
  );
  nextBtn.value = document.querySelector(
    `.next-btn${isSmall.value ? "2" : ""}`
  );
  itemsContainer.value = document.querySelector(".items-container");

  if (!mobileScreen.value && storiesContent.value) {
    storiesContent.value.addEventListener("scroll", handleScroll);
  }
});
</script>

<template>
  <div class="relative max-w-full flex-1">
    <div
      :id="`${id}`"
      :class="`${id} content`"
      ref="storiesContent"
      @mouseover="isShowBtn = true"
      @mouseleave="isShowBtn = false"
    >
      <div
        v-if="!mobileScreen"
        style="transition: all 0.3s ease"
        :style="{ opacity: isShowBtn ? '1' : '0' }"
      >
        <div
          :class="`previous-btn${isSmall ? '2' : ''}`"
          @click="scrollPrevious"
        >
          <i class="pi pi-angle-left" />
        </div>
      </div>

      <div
        class="flex items-container"
        :class="mobileScreen ? 'gap-2' : 'gap-3'"
        ref="itemsContainer"
      >
        <div v-for="(item, index) in content" :key="index">
          <slot name="contentItem" :item="item" />
        </div>
      </div>

      <div
        v-if="!mobileScreen"
        style="transition: all 0.3s ease"
        :style="{ opacity: isShowBtn ? '1' : '0' }"
      >
        <div
          :class="`active next-btn${isSmall ? '2' : ''}`"
          @click="scrollNext"
        >
          <i class="pi pi-angle-right" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.content {
  overflow-x: scroll;
  scrollbar-width: none;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
}

.items-container {
  display: flex;
  transition: transform 0.3s ease-in-out;
}

.previous-btn,
.next-btn {
  position: absolute;
  top: 50%;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 2.3rem;
  height: 4rem;
  transform: translateY(-100%);
  background: #ffffffe3;
  color: #3b3b3b;
  opacity: 0;
  pointer-events: none;
  transition: all 400ms ease;
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
    rgba(90, 125, 188, 0.05) 0px 0.25em 1em;

  &.active {
    opacity: 1;
    pointer-events: auto;
    transition: all 400ms ease;
  }
}

.previous-btn {
  left: 8px;
  border-radius: 0.7rem 0 0 0.7rem;
}

.next-btn {
  right: 8px;
  border-radius: 0 0.7rem 0.7rem 0;
}

.next-btn2 {
  border-radius: 0 0.4rem 0.4rem 0;
  right: 0px;
}

.previous-btn2 {
  border-radius: 0.4rem 0 0 0.4rem;
  left: 0px;
}

.previous-btn2,
.next-btn2 {
  position: absolute;
  top: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 2rem;
  height: 100%;
  background: #ffffffe3;
  color: #3b3b3b;
  opacity: 0;
  pointer-events: none;
  transition: all 400ms ease;
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
    rgba(90, 125, 188, 0.05) 0px 0.25em 1em;

  &.active {
    opacity: 1;
    pointer-events: auto;
    transition: all 400ms ease;
  }
}
</style>
