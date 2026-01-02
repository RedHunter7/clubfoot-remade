<script setup lang="ts">
import IconError from '@/components/icons/IconError.vue'

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <IconError class="fill-error size-24 mx-auto mb-4" />
  <div class="text-center text-lg">{{ props.message }}</div>
</template>
