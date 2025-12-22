<script setup lang="ts">
import LeagueTable from '@/components/LeagueTable.vue'

import 'vue3-carousel/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'

const images = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  url: `https://picsum.photos/seed/${Math.random()}/800/600`,
}))

const config = {
  height: 200,
  itemsToShow: 2,
  gap: 5,
}
</script>

<template>
  <div class="bg-primary">
    <div class="flex flex-row h-[calc(100vh_-_72px)]">
      <div class="w-2/5 my-8">
        <div class="bg-base-100 w-3/4 h-48 rounded-xl mx-auto"></div>
        <div class="text-center text-white text-2xl my-4">
          <div>Defending Champions</div>
          <img src="@/assets/images/custom-club.svg" class="fill-white" srcset="" />
          <div>Liverpool</div>
        </div>
      </div>
      <div class="w-3/5">
        <league-table />
      </div>
    </div>
    <div class="text-center py-8">
      <h3 class="text-white text-2xl my-4">Matchday 38</h3>
      <Carousel class="w-5/6 mx-auto" v-bind="config">
        <Slide v-for="image in images" :key="image.id">
          <img :src="image.url" alt="image" />
        </Slide>
      </Carousel>
    </div>
  </div>
</template>
