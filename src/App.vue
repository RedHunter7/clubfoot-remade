<script setup lang="ts">
import NavigationBar from './components/NavigationBar.vue'
</script>

<template>
  <NavigationBar />
  <RouterView class="bg-primary min-h-[h-[calc(100vh_-_72px)]]" />
</template>
