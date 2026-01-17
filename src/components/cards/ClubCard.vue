<script setup lang="ts">
import type { Team } from '@/types'
import { RouterLink } from 'vue-router'

interface props {
  data: Team
}

const props = defineProps<props>()

let leagueName = ''
props.data.runningCompetitions.forEach((competition) => {
  if (competition.type == 'LEAGUE') {
    leagueName = competition.name
  }
})
</script>

<template>
  <RouterLink
    :to="`/club/${props.data.id}`"
    class="h-40 w-48 bg-base-100 rounded-2xl px-2 py-3 text-black text-center flex flex-col justify-between hover:bg-secondary hover:text-white"
  >
    <div class="text-base">{{ leagueName }}</div>
    <img
      v-lazy="props.data.crest"
      src="https://placehold.co/240x240/c82586/4eeaf6?text=%3E(0)%3C\n%3E(0)%3C"
      width="80"
      height="80"
      class="fill-white size-20 mx-auto"
      srcset=""
    />
    <div>{{ props.data.shortName }}</div>
  </RouterLink>
</template>
