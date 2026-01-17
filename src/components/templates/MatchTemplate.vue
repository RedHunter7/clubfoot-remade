<script setup lang="ts">
import getDayDifference from '@/functions/GetDayDifference'
import { getImageUrl } from '@/functions/GetImageUrl'

type Match = {
  id: number
  utcDate: string
  status: string
  homeTeam: {
    id: number
    shortName: string
    crest: string
  }
  awayTeam: {
    id: number
    shortName: string
    crest: string
  }
  score: {
    winner: string
    fullTime: {
      home: number
      away: number
    }
  }
}

interface props {
  data: Match
  clubId: number
}

const props = defineProps<props>()

let bottomText = ''
if (props.data.status == 'TIMED') {
  const scheduleTime = new Date(props.data.utcDate)
  const currentTime = new Date()

  const localTime = scheduleTime.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })

  const daysDiff = getDayDifference(currentTime, scheduleTime)
  switch (daysDiff) {
    case 0:
      bottomText = localTime.slice(12)
      break
    case 1:
      bottomText = `Tomorrow`
      break
    default:
      bottomText = localTime.slice(0, 10)
  }
} else if (props.data.status == 'FINISHED') {
  bottomText = `${props.data.score.fullTime.home} - ${props.data.score.fullTime.away}`
  switch (props.data.score.winner) {
    case 'HOME_TEAM':
      bottomText =
        props.clubId == props.data.homeTeam.id ? `${bottomText} (W)` : `${bottomText} (L)`
      break
    case 'AWAY_TEAM':
      bottomText =
        props.clubId == props.data.awayTeam.id ? `${bottomText} (L)` : `${bottomText} (W)`
      break
    default:
      bottomText = `${bottomText} (D)`
      break
  }
}
</script>
<template>
  <div
    class="text-center flex flex-col justify-between my-3 font-bold text-black text-xs lg:text-sm w-24 lg:w-32"
  >
    <template v-if="clubId != props.data.homeTeam.id">
      <div>{{ props.data.homeTeam.shortName }}</div>
      <img
        v-lazy="props.data.homeTeam.crest"
        :src="getImageUrl('custom-club', 'svg')"
        width="96"
        height="96"
        class="fill-white size-16 sm:size-18 lg:size-24 mx-auto my-2"
        srcset=""
      />
    </template>
    <template v-else-if="clubId != props.data.awayTeam.id">
      <div>{{ props.data.awayTeam.shortName }}</div>
      <img
        v-lazy="props.data.awayTeam.crest"
        :src="getImageUrl('custom-club', 'svg')"
        width="96"
        height="96"
        class="fill-white size-16 sm:size-18 lg:size-24 mx-auto my-2"
        srcset=""
      />
    </template>
    <div>{{ bottomText }}</div>
  </div>
</template>
