<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  isReverse: {
    type: Boolean,
    default: false,
  },
})

let heroContentClass = 'hero-content px-16 flex-col lg:flex-row-reverse'
if (props.isReverse) {
  heroContentClass = 'hero-content px-16 flex-col lg:flex-row'
}
</script>

<template>
  <div className="hero text-white py-8">
    <div v-bind:class="{ heroContentClass }">
      <img src="@/assets/images/league_icon.png" className="w-sm rounded-xl bg-white/10" />
      <div class="w-7/12">
        <h1 className="text-4xl font-bold">Get the latest league infromation</h1>
        <p className="text-2xl py-6">
          See the latest league information about standings, schedule and match result
        </p>
      </div>
    </div>
  </div>
</template>
