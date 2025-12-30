<script setup lang="ts">
type Match = {
  id: number
  utcDate: string
  homeTeam: {
    shortName: string
    crest: string
  }
  awayTeam: {
    shortName: string
    crest: string
  }
  score: {
    fulltime: {
      home: string
      away: string
    }
  }
}

interface props {
  data: Match
}

const props = defineProps<props>()
</script>

<template>
  <div class="bg-base-100 w-90 h-48 rounded-2xl p-3 text-center">
    <div>{{ props.data.utcDate }}</div>
    <div class="flex flex-row mt-2 gap-x-1 flex flex-row justify-center items-center gap-x-6">
      <div class="flex flex-col gap-y-2">
        <img :src="props.data.homeTeam.crest" alt="" class="size-24 mx-auto" />
        <div>{{ props.data.homeTeam.shortName }}</div>
      </div>
      <div class="text-3xl">VS</div>
      <div class="flex flex-col gap-y-2">
        <img :src="props.data.awayTeam.crest" alt="" class="size-24 mx-auto" />
        <div>{{ props.data.awayTeam.shortName }}</div>
      </div>
    </div>
  </div>
</template>
