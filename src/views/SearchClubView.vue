<script setup lang="ts">
import ClubCard from '@/components/cards/ClubCard.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import { useClubListStore } from '@/stores/clubs/ClubList'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { vInfiniteScroll } from '@vueuse/components'

type Team = {
  shortName: string
}

const cardContainerClass = 'flex flex-row flex-wrap justify-center gap-6 my-8 w-5/6 mx-auto'

const clubListStore = useClubListStore()
const clubList = storeToRefs(clubListStore)

onMounted(() => {
  if (clubList.data.value.length == 0) {
    clubListStore.resetClubList().then(() => {
      clubListStore.fetchClubList()
      loadedData.value.push(...clubList.data.value.slice(0, 20))
    })
  }
})

const loadedData = ref([])
const loadCall = ref(0)

function onLoadMore() {
  loadCall.value++
  const x = 20 * loadCall.value
  const y = x + 20
  loadedData.value.push(...clubList.data.value.slice(x + 1, y))
}

function canLoadMore() {
  // inidicate when there is no more content to load so onLoadMore stops triggering
  // if (noMoreContent) return false
  if (loadCall.value >= 3) return false
  return true // for demo purposes
}

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
</script>

<template>
  <div v-if="clubList.isLoading.value">
    <div class="pt-8 text-center">
      <div class="animate-pulse skeleton h-12 w-72 rounded-xl mx-auto"></div>
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
    <div class="pt-8 text-center">
      <label className="input input-lg rounded-xl border-none outline-none">
        <IconSearch />
        <input type="search" placeholder="Search" @input="handleInput" />
      </label>
    </div>
    <div v-if="filteredData" :class="cardContainerClass">
      <div v-for="club in filteredData" :key="club">
        <ClubCard :data="club" />
      </div>
    </div>
    <div
      v-else
      v-infinite-scroll="[onLoadMore, { distance: 10, canLoadMore }]"
      :class="cardContainerClass"
    >
      <div v-for="club in loadedData" :key="club">
        <ClubCard :data="club" />
      </div>
    </div>
  </div>
</template>
