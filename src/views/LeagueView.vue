<script setup lang="ts">
import { useRoute } from 'vue-router'
import LeagueTable from '@/components/LeagueTable.vue'
import MatchCard from '@/components/cards/MatchCard.vue'

import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'

import { useLeagueStandingStore } from '@/stores/leagues/LeagueStanding'
import { storeToRefs } from 'pinia'
import { onMounted, watch } from 'vue'
import { useLeagueMatchesStore } from '@/stores/leagues/LeagueMatches'

const config = {
  height: 200,
  itemsToShow: 3,
  gap: 2,
  autoplay: 2000,
  wrapAround: true,
  pauseAutoplayOnHover: true,
  mouseWheel: true,
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
</script>

<template>
  <div class="bg-primary">
    <div class="flex flex-row h-[calc(100vh_-_72px)]">
      <div class="w-2/5 my-8">
        <div class="bg-base-100 w-3/4 h-48 rounded-xl mx-auto flex items-center">
          <div
            v-if="leagueStanding.isLoading.value"
            className="skeleton size-full animate-pulse"
          ></div>
          <img
            v-else-if="leagueStanding.data.value"
            :src="leagueStanding.data.value.competition.emblem"
            class="fill-white size-40 mx-auto"
            srcset=""
          />
        </div>
        <div class="text-center text-white text-2xl my-4">
          <div v-if="leagueStanding.isLoading.value" class="animate-pulse w-3/4 mx-auto">
            <div className="skeleton w-48 h-8 mx-auto"></div>
            <div class="skeleton w-64 h-40 mx-auto my-4"></div>
            <div className="skeleton w-48 h-8 mx-auto"></div>
          </div>
          <div v-else-if="leagueStanding.data.value">
            <div>{{ leagueStanding.data.value.competition.name }}</div>
            <img
              :src="leagueStanding.data.value.area.flag"
              class="fill-white w-64 mx-auto my-4 border-2 border-secondary"
              srcset=""
            />
            <div>{{ leagueStanding.data.value.area.name }}</div>
          </div>
        </div>
      </div>
      <div class="w-3/5">
        <div v-if="leagueStanding.isLoading.value" className="overflow-x-scroll h-full">
          <table className="table">
            <thead class="text-white">
              <tr>
                <th>#</th>
                <th>Club</th>
                <th>P</th>
                <th>W</th>
                <th>D</th>
                <th>L</th>
                <th>GD</th>
                <th>PTS</th>
              </tr>
            </thead>
          </table>
          <div v-for="n in 16" :key="n">
            <div class="animate-pulse skeleton w-full h-10 my-2"></div>
          </div>
        </div>
        <p v-else-if="leagueStanding.error.value" class="error">{{ leagueStanding.error.value }}</p>
        <LeagueTable v-else :data="leagueStanding.data.value.leagueTable" />
      </div>
    </div>
    <div class="text-center py-8 w-full">
      <h3 class="text-white text-2xl my-4">
        Matchday {{ leagueStanding.data.value.currentMatchday }}
      </h3>
      <Carousel
        v-if="leagueStanding.isLoading.value || leagueMatches.isLoading.value"
        class="w-full"
        v-bind="config"
      >
        <Slide v-for="n in 10" :key="n">
          <div class="skeleton animate-pulse w-90 h-48 rounded-2xl"></div>
        </Slide>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
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
