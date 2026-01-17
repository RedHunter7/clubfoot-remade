<script setup lang="ts">
import { getImageUrl } from '@/functions/GetImageUrl'

const props = defineProps({
  header: {
    type: String,
    required: true,
  },
  paragraph: {
    type: String,
    required: true,
  },
  imageName: {
    type: String,
    required: true,
  },
  isReverse: {
    type: Boolean,
    default: false,
  },
  imageBgOpacity: {
    type: Number,
    default: 10,
    validator: (value: number) => {
      return value >= 0 && value <= 10
    },
  },
})
</script>

<template>
  <div className="hero text-white lg:py-8 text-center sm:text-left">
    <div
      class="hero-content px-16 flex-col gap-x-16"
      v-bind:class="{
        'sm:flex-row': props.isReverse,
        'sm:flex-row-reverse': !props.isReverse,
      }"
    >
      <img
        v-lazy="getImageUrl(props.imageName, 'png')"
        src="https://placehold.co/360x240/transparent/FFF?text=%3E(0)%3C"
        :alt="`${props.header} Hero`"
        width="380"
        height="260"
        class="w-xs lg:w-sm rounded-xl object-scale-down"
        :class="`bg-white/${props.imageBgOpacity}`"
      />
      <div class="lg:w-7/12">
        <h1 className="text-2xl lg:text-4xl font-bold">
          {{ props.header }}
        </h1>
        <p className="lg:text-xl py-2 lg:py-6">
          {{ props.paragraph }}
        </p>
      </div>
    </div>
  </div>
</template>
