<script setup lang="ts">
import SquadCard from '@/components/cards/SquadCard.vue'
import MatchTemplate from '@/components/templates/MatchTemplate.vue'
import SquadCardSkeleton from '@/components/skeletons/SquadCardSkeleton.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import { useClubDetailStore } from '@/stores/clubs/ClubDetail'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'
import { useClubMatchesStore } from '@/stores/clubs/ClubMatches'

const clubDetailStore = useClubDetailStore()
const clubDetail = storeToRefs(clubDetailStore)

const matchesClubStore = useClubMatchesStore()
const matchesClub = storeToRefs(matchesClubStore)

const route = useRoute()

onMounted(() => {
  const clubId = route.params.id as string
  clubDetailStore
    .fetchClubDetail(clubId)
    .then(() => {
      matchesClubStore.fetchClubMatches(clubId, 'SCHEDULED')
    })
    .then(() => {
      matchesClubStore.fetchClubMatches(clubId, 'FINISHED')
    })
})

const scheduledMatches = computed(() => {
  return matchesClub.data.value.filter((match) => match.status == 'TIMED')
})

const finishedMatches = computed(() => {
  return matchesClub.data.value.filter((match) => match.status == 'FINISHED')
})

const goalkeepers = computed(() => {
  return clubDetail.data.value.squad.filter((player) => player.position == 'Goalkeeper')
})

const defenders = computed(() => {
  return clubDetail.data.value.squad.filter(
    (player) =>
      player.position == 'Defence' ||
      player.position == 'Centre-Back' ||
      player.position == 'Right-Back' ||
      player.position == 'Left-Back',
  )
})

const midfielders = computed(() => {
  return clubDetail.data.value.squad.filter(
    (player) =>
      player.position == 'Midfield' ||
      player.position == 'Defensive Midfield' ||
      player.position == 'Central Midfield' ||
      player.position == 'Attacking Midfield',
  )
})

const attackers = computed(() => {
  return clubDetail.data.value.squad.filter(
    (player) =>
      player.position == 'Offence' ||
      player.position == 'Left Winger' ||
      player.position == 'Right Winger' ||
      player.position == 'Centre-Forward',
  )
})
</script>

<template>
  <div class="w-11/12 mx-auto">
    <div class="flex flex-row h-[calc(100vh_-_72px)]">
      <div
        v-if="clubDetail.isLoading.value"
        class="w-3/10 my-6 skeleton animate-pulse rounded-2xl"
      ></div>
      <div
        v-else-if="clubDetail.error.value"
        class="w-3/10 my-6 bg-base-100/80 rounded-2xl relative"
      >
        <div class="absolute top-1/2 left-1/2 -translate-1/2">
          <ErrorMessage :message="clubDetail.error.value" />
        </div>
      </div>
      <div v-else-if="clubDetail.data.value" class="w-3/10 my-6 bg-base-100/80 rounded-2xl">
        <div class="text-center text-2xl my-6 flex flex-col gap-y-6">
          <img :src="clubDetail.data.value.crest" class="fill-white size-32 mx-auto" srcset="" />
          <div>
            <div class="font-bold">{{ clubDetail.data.value.name }}</div>
            <div class="text-xl">
              {{ clubDetail.data.value.runningCompetitions[0]?.name }}
            </div>
          </div>
          <div class="mt-4">
            <div class="font-bold">{{ clubDetail.data.value.venue }}</div>
            <div class="text-lg">Venue</div>
          </div>
          <div>
            <div class="font-bold text-xl">
              {{ clubDetail.data.value.runningCompetitions[1]?.name || '-' }}
            </div>
            <div class="text-lg">Continental Competition</div>
          </div>
        </div>
      </div>
      <div class="w-7/10 my-6 ml-6">
        <div class="h-1/2">
          <h5 class="text-white font-bold pl-2 text-lg">Next Match</h5>
          <div
            v-if="matchesClub.isLoading.value"
            class="skeleton animate-pulse rounded-2xl w-full h-3/4 my-2 flex flex-row gap-x-4 justify-left px-6"
          ></div>
          <div
            v-else-if="matchesClub.error.value"
            class="bg-base-100/80 rounded-2xl w-full h-3/4 my-2 px-6 relative"
          >
            <div class="absolute top-1/2 left-1/2 -translate-1/2">
              <ErrorMessage :message="matchesClub.error.value" />
            </div>
          </div>
          <div
            v-else-if="matchesClub.data.value"
            class="bg-base-100/80 rounded-2xl w-full h-3/4 my-2 flex flex-row gap-x-4 justify-left px-6"
          >
            <div v-for="match in scheduledMatches" :key="match.id">
              <MatchTemplate :data="match" :clubId="Number(route.params.id)" />
            </div>
          </div>
        </div>
        <div class="h-1/2">
          <h5 class="text-white font-bold pl-2 text-lg">Match Result</h5>
          <div
            v-if="matchesClub.isLoading.value"
            class="skeleton animate-pulse rounded-2xl w-full h-3/4 my-2 flex flex-row gap-x-4 justify-left px-6"
          ></div>
          <div
            v-else-if="matchesClub.error.value"
            class="bg-base-100/80 rounded-2xl w-full h-3/4 my-2 px-6 relative"
          >
            <div class="absolute top-1/2 left-1/2 -translate-1/2">
              <ErrorMessage :message="matchesClub.error.value" />
            </div>
          </div>
          <div
            v-else-if="matchesClub.data.value"
            class="bg-base-100/80 rounded-2xl w-full h-3/4 my-2 flex flex-row gap-x-4 justify-left px-6"
          >
            <div v-for="match in finishedMatches" :key="match.id">
              <MatchTemplate :data="match" :clubId="Number(route.params.id)" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center text-white font-bold py-8">
      <h3 class="text-3xl my-4">Player & Staff</h3>
      <div class="flex flex-col gap-y-8">
        <div>
          <h6 class="mb-2 text-xl">Coach</h6>
          <SquadCardSkeleton v-if="clubDetail.isLoading.value" />
          <div v-else-if="clubDetail.error.value">
            <ErrorMessage :message="clubDetail.error.value" />
          </div>
          <SquadCard v-else-if="clubDetail.data.value" :data="clubDetail.data.value.coach" />
        </div>
        <div>
          <h6 class="mb-2 text-xl">Goalkeeper</h6>
          <div class="mt-4 flex flex-row flex-wrap gap-4 justify-center">
            <template v-if="clubDetail.isLoading.value">
              <template v-for="n in 3" :key="n">
                <SquadCardSkeleton />
              </template>
            </template>
            <div v-else-if="clubDetail.error.value">
              <ErrorMessage :message="clubDetail.error.value" />
            </div>
            <template v-else-if="clubDetail.data.value">
              <div v-for="goalkeeper in goalkeepers" :key="goalkeeper.id">
                <SquadCard :data="goalkeeper" />
              </div>
            </template>
          </div>
        </div>
        <div>
          <h6 class="mb-2 text-xl">Defender</h6>
          <div class="mt-4 flex flex-row flex-wrap gap-4 justify-center">
            <template v-if="clubDetail.isLoading.value">
              <template v-for="n in 9" :key="n">
                <SquadCardSkeleton />
              </template>
            </template>
            <div v-else-if="clubDetail.error.value">
              <ErrorMessage :message="clubDetail.error.value" />
            </div>
            <template v-else-if="clubDetail.data.value">
              <div v-for="defender in defenders" :key="defender.id">
                <SquadCard :data="defender" />
              </div>
            </template>
          </div>
        </div>
        <div>
          <h6 class="mb-2 text-xl">Midfield</h6>
          <div class="mt-4 flex flex-row flex-wrap gap-4 justify-center">
            <template v-if="clubDetail.isLoading.value">
              <template v-for="n in 6" :key="n">
                <SquadCardSkeleton />
              </template>
            </template>
            <div v-else-if="clubDetail.error.value">
              <ErrorMessage :message="clubDetail.error.value" />
            </div>
            <template v-else-if="clubDetail.data.value">
              <div v-for="midfield in midfielders" :key="midfield.id">
                <SquadCard :data="midfield" />
              </div>
            </template>
          </div>
        </div>
        <div>
          <h6 class="mb-2 text-xl">Attacker</h6>
          <div class="mt-4 flex flex-row flex-wrap gap-4 justify-center">
            <template v-if="clubDetail.isLoading.value">
              <template v-for="n in 6" :key="n">
                <SquadCardSkeleton />
              </template>
            </template>
            <div v-else-if="clubDetail.error.value">
              <ErrorMessage :message="clubDetail.error.value" />
            </div>
            <template v-else-if="clubDetail.data.value">
              <div v-for="attacker in attackers" :key="attacker.id">
                <SquadCard :data="attacker" />
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
