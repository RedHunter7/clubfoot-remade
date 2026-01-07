<script setup lang="ts">
import ClubCard from '@/components/cards/ClubCard.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import { useClubListStore } from '@/stores/clubs/ClubList'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const cardContainerClass = 'flex flex-row flex-wrap justify-center gap-6 my-8 w-5/6 mx-auto'

const clubListStore = useClubListStore()
const clubList = storeToRefs(clubListStore)

onMounted(() => {
  clubListStore.fetchClubList()
})
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
        <input type="search" placeholder="Search" />
      </label>
    </div>
    <div :class="cardContainerClass">
      <div v-for="club in clubList.data.value" :key="club">
        <ClubCard :data="club" />
      </div>
    </div>
  </div>
</template>
