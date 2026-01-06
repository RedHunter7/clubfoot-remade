<script setup lang="ts">
import { countryToAlpha2 } from 'country-to-iso'

type Coach = {
  id: number
  name: string
  nationality: string
}

type Player = {
  id: number
  name: string
  position: string
  nationality: string
}

interface props {
  data: Coach | Player
}

const props = defineProps<props>()

const flagCode = countryToAlpha2(props.data.nationality)
console.log(flagCode)
</script>

<template>
  <div
    class="bg-base-100/80 rounded-2xl w-80 h-20 px-6 py-4 mx-auto text-black flex flex-col justify-center gap-y-2"
  >
    <div class="text-xl">{{ props.data.name }}</div>
    <div class="flex flex-row justify-center gap-x-2">
      <div class="font-normal">{{ props.data.nationality }}</div>
      <img :src="`https://flagsapi.com/${flagCode}/flat/24.png`" />
    </div>
  </div>
</template>
