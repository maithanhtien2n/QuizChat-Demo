<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay, Keyboard } from "swiper/modules";

const props = defineProps({
  images: {
    type: Array,
    default: [
      { id: 1, image: "/images/image-product-default.svg" },
      { id: 2, image: "/images/image-product-default.svg" },
      { id: 3, image: "/images/image-product-default.svg" },
    ],
  },
  delay: { type: Number, default: 3000 },
});

const onBulletRenderer = (index, className) => {
  const _className = `${className} swiper-bullet-custom shadow-5`;
  return `<span class="${_className}"></span>`;
};
</script>

<template>
  <swiper
    :slides-per-view="1"
    :loop="true"
    :looped-slides="1"
    :autoplay="{
      delay: delay,
      disableOnInteraction: false,
    }"
    :modules="[Pagination, Keyboard, Autoplay]"
    :keyboard="{ enabled: true }"
    :pagination="{
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 20,
      renderBullet: onBulletRenderer,
    }"
  >
    <swiper-slide v-for="(item, index) in images" :key="index">
      <div class="py-0 h-12rem md:h-20rem box-shadow-2">
        <img
          :src="item?.image"
          class="w-full h-full"
          style="object-fit: contain"
        />
      </div>
    </swiper-slide>
  </swiper>
</template>

<style lang="scss" scoped>
.show-item-hover {
  display: none;
}

.right-content {
  width: 30%;
  max-height: 100vh; /* Chiều cao tối đa của phần bên phải */
  position: sticky;
  top: -300px; /* Đặt phần tử dính ở đỉnh của khung nhìn khi cuộn lên */
}

// .sticky-div {
//   position: sticky;
//   bottom: 0; /* Đặt phần tử dính ở đỉnh của khung nhìn khi cuộn lên */
// }

// .sticky-content {
//   background-color: white; /* Ensure background is white */
//   padding: 1rem; /* Adjust padding as needed */
// }
/* Hiện show-item-hover khi hover vào item-hover */
.item-hover {
  display: none;
  &:hover {
    .show-item-hover {
      display: block;
      &:hover {
        color: #10b981;
      }
    }
  }
}

.swiper {
  ::v-deep(.swiper-pagination) {
    // width: 35rem !important;

    .swiper-pagination-bullet-active-prev,
    .swiper-pagination-bullet-active-prev-prev,
    .swiper-pagination-bullet-active-next,
    .swiper-pagination-bullet-active-next-next {
      transform: scale(1);
    }
  }

  ::v-deep(.swiper-bullet-custom) {
    margin-block: 0.25rem;
    width: 0.85rem;
    height: 0.85rem;
    border-radius: 2rem;
    opacity: 0.4;
    background-color: #fff;

    &:hover {
      opacity: 0.8;
      will-change: opacity;
      transition: opacity 0.3s linear;
    }

    &.swiper-pagination-bullet-active {
      opacity: 1;
      // width: 1.1rem;
      will-change: opacity;
      transition: opacity 0.3s linear;
    }
  }
}
</style>
