<script setup lang="ts">
import ClubCard from '@/components/cards/ClubCard.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import { useClubListStore } from '@/stores/clubs/ClubList'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import type { Team } from '@/types'
import IconBundesliga from '@/components/icons/leagues/IconBundesliga.vue'
import IconPremierLeague from '@/components/icons/leagues/IconPremierLeague.vue'
import IconLaLiga from '@/components/icons/leagues/IconLaLiga.vue'
import IconSerieA from '@/components/icons/leagues/IconSerieA.vue'
import { useHead } from '@unhead/vue'

useHead({
  title: 'Search Club | Club Foot',
})

const cardContainerClass = 'flex flex-row flex-wrap justify-center gap-6 my-8 w-5/6 mx-auto'

const clubListStore = useClubListStore()
const clubList = storeToRefs(clubListStore)

const leagues = ['PL', 'SA', 'PD', 'BL1']
const selectedLeague = ref(leagues[Math.floor(Math.random() * 4)])

const searchQuery = ref('')

const filteredData = computed(() => {
  return clubList.data.value.filter((club: Team) =>
    club.shortName.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

const updateSearch = useDebounceFn((value) => {
  searchQuery.value = value
}, 300)

const handleInput = (event: Event) => {
  if (event.target instanceof HTMLElement) {
    const inputElement = event.target as HTMLInputElement
    return updateSearch(inputElement.value)
  }
}

watch(
  () => selectedLeague.value,
  () => {
    clubListStore.resetClubList().then(() => {
      if (selectedLeague.value) {
        clubListStore.fetchClubList(selectedLeague.value)
      }
    })
  },
)

onMounted(() => {
  clubListStore.resetClubList().then(() => {
    if (selectedLeague.value) {
      clubListStore.fetchClubList(selectedLeague.value)
    }
  })
})
</script>

<template>
  <div v-if="clubList.isLoading.value">
    <div class="pt-8 flex flex-wrap justify-center items-center gap-x-2 gap-y-4">
      <div class="animate-pulse skeleton h-12 w-72 rounded-xl"></div>
      <div class="animate-pulse skeleton h-12 w-40 rounded-xl"></div>
    </div>
    <div :class="cardContainerClass">
      <div v-for="n in 16" :key="n">
        <div class="animate-pulse skeleton h-40 w-48 rounded-2xl"></div>
      </div>
    </div>
  </div>
  <div v-else-if="clubList.error.value">
    <div class="mt-40 text-white">
      <ErrorMessage :message="clubList.error.value" />
    </div>
  </div>
  <div v-else-if="clubList.data.value">
    <div class="pt-8 text-center flex flex-wrap justify-center items-center gap-x-2 gap-y-4">
      <label className="input input-lg rounded-xl border-none outline-none text-black">
        <IconSearch />
        <input type="search" placeholder="Search" @input="handleInput" />
      </label>
      <select
        v-model="selectedLeague"
        className="select select-lg w-40 rounded-xl text-black text-base border-none outline-none"
      >
        <option value="PL"><IconPremierLeague class="size-6" /> Premier League</option>
        <option value="SA"><IconSerieA class="size-6" /> Serie A</option>
        <option value="PD"><IconLaLiga class="size-6" /> La Liga</option>
        <option value="BL1"><IconBundesliga class="size-6" /> Bundesliga</option>
      </select>
    </div>
    <div v-if="searchQuery != ''" :class="cardContainerClass">
      <div v-for="club in filteredData" :key="club.id">
        <ClubCard :data="club" />
      </div>
    </div>
    <div v-else :class="cardContainerClass">
      <div v-for="club in clubList.data.value" :key="club.id">
        <ClubCard :data="club" />
      </div>
    </div>
  </div>
</template>
