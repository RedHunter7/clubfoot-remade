<script setup lang="ts">
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

function getImageUrl(name: string, ext: string) {
  return new URL(`../assets/images/${name}.${ext}`, import.meta.url).href
}
</script>

<template>
  <div className="hero text-white py-8">
    <div
      class="hero-content px-16 flex-col gap-x-16"
      v-bind:class="{
        'lg:flex-row': props.isReverse,
        'lg:flex-row-reverse': !props.isReverse,
      }"
    >
      <img
        :src="getImageUrl(props.imageName, 'png')"
        class="w-sm rounded-xl object-scale-down"
        :class="`bg-white/${props.imageBgOpacity}`"
      />
      <div class="w-7/12">
        <h1 className="text-4xl font-bold">
          {{ props.header }}
        </h1>
        <p className="text-2xl py-6">
          {{ props.paragraph }}
        </p>
      </div>
    </div>
  </div>
</template>
