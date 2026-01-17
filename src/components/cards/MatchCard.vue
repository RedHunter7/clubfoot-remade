<script setup lang="ts">
import getDayDifference from '@/functions/GetDayDifference'
import { getImageUrl } from '@/functions/GetImageUrl'

type Match = {
  id: number
  utcDate: string
  status: string
  minute: string
  homeTeam: {
    shortName: string
    crest: string
  }
  awayTeam: {
    shortName: string
    crest: string
  }
  score: {
    fullTime: {
      home: number
      away: number
    }
  }
}

interface props {
  data: Match
}

const props = defineProps<props>()

const scheduleTime = new Date(props.data.utcDate)
const currentTime = new Date()

let headerText = ''
let middleText = 'VS'

// console.log(props.data.utcDate)

switch (props.data.status) {
  case 'FINISHED':
    headerText = `Fulltime`
    middleText = `${props.data.score.fullTime.home}-${props.data.score.fullTime.away}`
    break
  case 'LIVE':
    headerText = `LIVE ${props.data.minute}""`
    break
  case 'TIMED':
    headerText = scheduleTime.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
    // console.log(headerText)
    const daysDiff = getDayDifference(currentTime, scheduleTime)
    switch (daysDiff) {
      case 0:
        headerText = `Today${headerText.slice(10)}`
        break
      case 1:
        headerText = `Tomorrow${headerText.slice(10)}`
        break
    }
    break
}
</script>

<template>
  <div class="bg-base-100 w-72 h-40 lg:w-90 lg:h-48 rounded-2xl p-3 text-center text-black">
    <div class="font-bold text-lg">{{ headerText }}</div>
    <div class="flex flex-row mt-3 gap-x-1 flex flex-row justify-center items-center gap-x-6">
      <div class="flex flex-col gap-y-2">
        <img
          v-lazy="props.data.homeTeam.crest"
          :src="getImageUrl('custom-club', 'svg')"
          :alt="`${props.data.homeTeam.shortName} (Home Team) Crest`"
          class="size-16 lg:size-24 mx-auto"
          width="96"
          height="96"
        />
        <div class="text-sm">{{ props.data.homeTeam.shortName }}</div>
      </div>
      <div class="text-3xl font-bold">{{ middleText }}</div>
      <div class="flex flex-col gap-y-2">
        <img
          v-lazy="props.data.awayTeam.crest"
          :src="getImageUrl('custom-club', 'svg')"
          :alt="`${props.data.homeTeam.shortName} (Away Team) Crest`"
          class="size-16 lg:size-24 mx-auto"
          width="96"
          height="96"
        />
        <div class="text-sm">{{ props.data.awayTeam.shortName }}</div>
      </div>
    </div>
  </div>
</template>
