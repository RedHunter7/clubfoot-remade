<script setup lang="ts">
import { RouterLink } from 'vue-router'

type Team = {
  id: number
  shortName: string
  crest: string
  runningCompetitions: [
    {
      name: string
    },
  ]
}

interface props {
  data: Team
}

const props = defineProps<props>()
</script>

<template>
  <RouterLink
    :to="`/club/${props.data.id}`"
    class="h-40 w-48 bg-base-100 rounded-2xl px-2 py-3 text-center flex flex-col justify-between hover:bg-secondary hover:text-white"
  >
    <div class="text-base">{{ props.data.runningCompetitions[0].name }}</div>
    <img :src="props.data.crest" class="fill-white size-20 mx-auto" srcset="" />
    <div>{{ props.data.shortName }}</div>
  </RouterLink>
</template>
