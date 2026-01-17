<script setup lang="ts">
import { useRoute } from 'vue-router'
import LeagueTable from '@/components/tables/LeagueTable.vue'
import LeagueTableHeader from '@/components/tables/LeagueTableHeader.vue'
import MatchCard from '@/components/cards/MatchCard.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'

import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'

import { useLeagueStandingStore } from '@/stores/leagues/LeagueStanding'
import { storeToRefs } from 'pinia'
import { onMounted, watch } from 'vue'
import { useLeagueMatchesStore } from '@/stores/leagues/LeagueMatches'

import { useSeoMeta } from '@unhead/vue'

const config = {
  height: 200,
  itemsToShow: 1,
  gap: 2,
  autoplay: 2000,
  wrapAround: true,
  pauseAutoplayOnHover: true,
  mouseWheel: true,
  breakpoints: {
    // 300px and up
    640: {
      itemsToShow: 1,
      gap: 1,
    },
    // 400px and up
    768: {
      itemsToShow: 2,
      gap: 0,
    },
    // 500px and up
    1024: {
      itemsToShow: 3,
    },
  },
}

const leagueStandingStore = useLeagueStandingStore()
const leagueStanding = storeToRefs(leagueStandingStore)

const leagueMatchesStore = useLeagueMatchesStore()
const leagueMatches = storeToRefs(leagueMatchesStore)

const route = useRoute()

watch(
  () => route.params.id,
  (newId) => {
    const leagueCode = newId as string
    leagueStandingStore.fetchLeagueStanding(leagueCode).then(() => {
      const currentMatchday = leagueStanding.data.value.currentMatchday
      leagueMatchesStore.fetchLeagueMatches(leagueCode, currentMatchday)
    })
  },
)

onMounted(() => {
  const leagueCode = route.params.id as string
  leagueStandingStore.fetchLeagueStanding(leagueCode).then(() => {
    const currentMatchday = leagueStanding.data.value.currentMatchday
    leagueMatchesStore.fetchLeagueMatches(leagueCode, currentMatchday)
  })
})

useSeoMeta({
  title: () => `${leagueStanding.data.value.competition.name} | Club Foot`,
  description: () => `${leagueStanding.data.value.competition.name} Standings & Matches`,
  ogTitle: () => `${leagueStanding.data.value.competition.name} | Club Foot`,
  ogDescription: () => `${leagueStanding.data.value.competition.name} Standings & Matches`,
  ogImage: () => leagueStanding.data.value.competition.emblem,
})
</script>

<template>
  <div class="bg-primary">
    <div class="flex flex-col lg:flex-row landscape:h-[calc(100vh_-_72px)]">
      <div
        class="w-11/12 lg:w-2/5 mx-auto my-2 md:my-8 flex flex-row lg:flex-col justify-center items-center gap-x-4 md:gap-x-16"
      >
        <div class="bg-base-100 w-40 h-fit md:w-80 md:h-48 rounded-xl lg:mx-auto">
          <div
            v-if="leagueStanding.isLoading.value"
            className="skeleton h-24 w-full md:size-full animate-pulse"
          ></div>
          <div v-else-if="leagueStanding.error.value" class="mx-auto my-2 md:my-7">
            <ErrorMessage :message="leagueStanding.error.value" />
          </div>
          <img
            v-else-if="leagueStanding.data.value"
            v-lazy="leagueStanding.data.value.competition.emblem"
            src="https://placehold.co/80x80/fff/000?text=%3E(0)%3C"
            :alt="`${leagueStanding.data.value.competition.name} Emblem`"
            width="160"
            height="160"
            class="fill-white size-20 md:size-40 mx-auto my-2 md:my-4"
            srcset=""
          />
        </div>
        <div class="text-center text-white text-xl md:text-2xl my-4">
          <div v-if="leagueStanding.isLoading.value" class="animate-pulse w-full">
            <div className="skeleton w-24 md:w-48 h-4 md:h-8 mx-auto"></div>
            <div class="skeleton w-32 md:w-64 h-20 md:h-40 mx-auto my-4"></div>
            <div className="skeleton w-24 md:w-48 h-4 md:h-8 mx-auto"></div>
          </div>
          <div v-else-if="leagueStanding.error.value" class="lg:mt-16 text-lg">
            <ErrorMessage :message="leagueStanding.error.value" />
          </div>
          <div v-else-if="leagueStanding.data.value">
            <div>{{ leagueStanding.data.value.competition.name }}</div>
            <img
              v-lazy="leagueStanding.data.value.area.flag"
              src="https://placehold.co/256x155/086972/a7ff83?text=%3E(0)%3C"
              :alt="`${leagueStanding.data.value.area.name} Flag`"
              width="256"
              height="155"
              class="fill-white w-32 md:w-64 mx-auto my-2 md:my-4 border-2 border-secondary"
              srcset=""
            />
            <div>{{ leagueStanding.data.value.area.name }}</div>
          </div>
        </div>
      </div>
      <div class="w-full lg:w-3/5">
        <div v-if="leagueStanding.isLoading.value" class="overflow-x-scroll h-full">
          <LeagueTableHeader />
          <div v-for="n in 16" :key="n">
            <div class="animate-pulse skeleton w-full h-8 my-2"></div>
          </div>
        </div>
        <div v-else-if="leagueStanding.error.value" class="overflow-x-scroll h-full">
          <LeagueTableHeader />
          <div class="mt-8 lg:mt-32 text-white">
            <ErrorMessage :message="leagueStanding.error.value" />
          </div>
        </div>
        <LeagueTable v-else :data="leagueStanding.data.value.leagueTable" />
      </div>
    </div>
    <div class="text-center text-white py-8 w-full">
      <h3 class="text-2xl my-4">Matchday {{ leagueStanding.data.value.currentMatchday }}</h3>
      <Carousel
        v-if="leagueStanding.isLoading.value || leagueMatches.isLoading.value"
        class="w-full"
        v-bind="config"
      >
        <Slide v-for="n in 10" :key="n">
          <div class="skeleton animate-pulse w-72 h-40 lg:w-90 lg:h-48 rounded-2xl"></div>
        </Slide>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
      <div v-else-if="leagueMatches.error.value">
        <ErrorMessage :message="leagueMatches.error.value" />
      </div>
      <Carousel v-else-if="leagueMatches.data.value" class="w-full" v-bind="config">
        <Slide v-for="match in leagueMatches.data.value" :key="match">
          <MatchCard :data="match" />
        </Slide>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </div>
  </div>
</template>
