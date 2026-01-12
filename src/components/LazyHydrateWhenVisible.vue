<!-- LazyHydrateWhenVisible.vue -->
<template>
  <div ref="target" class="lazy-component-wrapper">
    <component v-if="isVisible" :is="componentToLoad" v-bind="$attrs" />
    <div v-else class="placeholder">
      <!-- Optional: Show a loading spinner or placeholder content -->
      Loading...
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, shallowRef } from 'vue'

const props = defineProps({
  component: String,
})

const target = ref(null)
const isVisible = ref(false)
const componentToLoad = shallowRef(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        isVisible.value = true
        if (target.value) observer.unobserve(target.value)

        // Dynamically import the specified component
        if (props.component) {
          import(props.component)
            .then((mod) => {
              componentToLoad.value = mod.default
            })
            .catch((err) => {
              console.error(`Failed to load component`, err)
            })
        }
      }
    },
    {
      root: null, // observe against the viewport
      threshold: 0.1, // trigger when 10% of the component is visible
    },
  )

  if (target.value) {
    observer.observe(target.value)
  }
})
</script>
