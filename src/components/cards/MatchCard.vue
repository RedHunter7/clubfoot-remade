<script setup lang="ts">
function getDayDifference(date1: Date, date2: Date) {
  // A day in milliseconds
  const millisecondsPerDay = 1000 * 60 * 60 * 24

  // Convert dates to UTC timestamps for consistent comparison
  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate())
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())

  // Calculate the difference in milliseconds and convert to days
  // Math.floor can be used to get only the full days
  return Math.floor((utc2 - utc1) / millisecondsPerDay)
}

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

switch (props.data.status) {
  case 'FINISHED':
    headerText = `Fulltime`
    middleText = `${props.data.score.fullTime.home}-${props.data.score.fullTime.away}`
    break
  case 'LIVE':
    headerText = `LIVE ${props.data.minute}""`
    break
  case 'TIMED':
    headerText = scheduleTime.toLocaleString()
    const daysDiff = getDayDifference(scheduleTime, currentTime)
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
  <div class="bg-base-100 w-90 h-48 rounded-2xl p-3 text-center text-black">
    <div class="font-bold text-lg">{{ headerText }}</div>
    <div class="flex flex-row mt-3 gap-x-1 flex flex-row justify-center items-center gap-x-6">
      <div class="flex flex-col gap-y-2">
        <img :src="props.data.homeTeam.crest" alt="" class="size-24 mx-auto" />
        <div class="text-sm">{{ props.data.homeTeam.shortName }}</div>
      </div>
      <div class="text-3xl font-bold">{{ middleText }}</div>
      <div class="flex flex-col gap-y-2">
        <img :src="props.data.awayTeam.crest" alt="" class="size-24 mx-auto" />
        <div class="text-sm">{{ props.data.awayTeam.shortName }}</div>
      </div>
    </div>
  </div>
</template>
