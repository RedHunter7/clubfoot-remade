<script setup lang="ts">
import countries from 'i18n-iso-countries'
import en from 'i18n-iso-countries/langs/en.json'

countries.registerLocale(en)

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

const flagCode = countries.getAlpha2Code(props.data.nationality, 'en') ?? 'GB'
// console.log(flagCode)
</script>

<template>
  <div
    class="bg-base-100/80 rounded-2xl w-80 h-20 px-6 py-4 mx-auto text-black flex flex-col justify-center gap-y-1"
  >
    <div class="text-xl">{{ props.data.name }}</div>
    <div class="flex flex-row justify-center gap-x-2">
      <div class="font-normal">{{ props.data.nationality }}</div>
      <img :src="`https://flagsapi.com/${flagCode}/shiny/24.png`" />
    </div>
  </div>
</template>
