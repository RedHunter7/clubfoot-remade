<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <RouterLink
    to="/club/1113"
    class="h-40 w-48 bg-base-100 rounded-2xl px-2 py-3 text-center flex flex-col justify-between hover:bg-secondary hover:text-white"
  >
    <div class="text-base">Premier League</div>
    <img src="@/assets/images/custom-club.svg" class="fill-white size-20 mx-auto" srcset="" />
    <div>Manchester United</div>
  </RouterLink>
</template>
