<script setup lang="ts">
import SquadCard from '@/components/cards/SquadCard.vue'
import MatchTemplate from '@/components/templates/MatchTemplate.vue'
import SquadCardSkeleton from '@/components/skeletons/SquadCardSkeleton.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import { useClubDetailStore } from '@/stores/clubs/ClubDetail'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { computed, onMounted, watch } from 'vue'
import { useClubMatchesStore } from '@/stores/clubs/ClubMatches'
import { useSeoMeta } from '@unhead/vue'
import { getImageUrl } from '@/functions/GetImageUrl'

const clubDetailStore = useClubDetailStore()
const clubDetail = storeToRefs(clubDetailStore)

const matchesClubStore = useClubMatchesStore()
const matchesClub = storeToRefs(matchesClubStore)

const route = useRoute()

watch(
  () => route.params.id,
  (newId) => {
    const clubId = newId as string
    clubDetailStore
      .fetchClubDetail(clubId)
      .then(() => {
        matchesClubStore.resetClubMatches()
      })
      .then(() => {
        matchesClubStore.fetchClubMatches(clubId, 'SCHEDULED')
      })
      .then(() => {
        matchesClubStore.fetchClubMatches(clubId, 'FINISHED')
      })
  },
)

onMounted(() => {
  const clubId = route.params.id as string
  matchesClubStore
    .resetClubMatches()
    .then(() => {
      clubDetailStore.fetchClubDetail(clubId)
    })
    .then(() => {
      matchesClubStore.resetClubMatches()
    })
    .then(() => {
      matchesClubStore.fetchClubMatches(clubId, 'SCHEDULED')
    })
    .then(() => {
      matchesClubStore.fetchClubMatches(clubId, 'FINISHED')
    })
})

const league = computed(() => {
  return clubDetail.data.value.runningCompetitions.find(
    (competition) => competition.type == 'LEAGUE',
  )
})

const continentalCompetition = computed(() => {
  return clubDetail.data.value.runningCompetitions.find(
    (competition) =>
      competition.code == 'CL' || competition.code == 'EL' || competition.code == 'UCL',
  )
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

useSeoMeta({
  title: () => `${clubDetail.data.value.name} | Club Foot`,
  description: () => `${clubDetail.data.value.name} Profile includes Matches & Squad`,
  ogTitle: () => `${clubDetail.data.value.name} | Club Foot`,
  ogDescription: () => `${clubDetail.data.value.name} Profile includes Matches & Squad`,
  ogImage: () => clubDetail.data.value.crest,
})
</script>

<template>
  <div class="w-11/12 mx-auto">
    <div class="flex flex-col sm:flex-row text-black">
      <div
        v-if="clubDetail.isLoading.value"
        class="w-full sm:w-3/10 my-6 h-56 sm:h-110 skeleton animate-pulse rounded-2xl"
      ></div>
      <div
        v-else-if="clubDetail.error.value"
        class="w-full sm:w-3/10 my-6 h-56 sm:h-110 bg-base-100/80 rounded-2xl relative"
      >
        <div class="absolute top-1/2 left-1/2 -translate-1/2">
          <ErrorMessage :message="clubDetail.error.value" />
        </div>
      </div>
      <div
        v-else-if="clubDetail.data.value"
        class="w-full sm:w-3/10 h-fit my-3 sm:my-6 bg-base-100/80 rounded-2xl"
      >
        <div
          class="text-center text-base sm:text-lg lg:text-2xl my-6 flex flex-col gap-y-6 py-0 sm:py-4"
        >
          <div class="flex sm:flex-col justify-center items-center gap-x-4">
            <img
              v-lazy="clubDetail.data.value.crest"
              :src="getImageUrl('@/assets/custom-club.svg', 'svg')"
              width="128"
              height="128"
              class="fill-white size-24 sm:size-32 sm:mx-auto"
              srcset=""
            />
            <div class="mt-6">
              <div class="font-bold">{{ clubDetail.data.value.name }}</div>
              <div class="text-lg lg:text-xl mt-1">
                {{ league?.name }}
              </div>
            </div>
          </div>
          <div class="flex sm:flex-col justify-evenly items-center">
            <div>
              <div class="font-bold text-xl">{{ clubDetail.data.value.venue }}</div>
              <div class="text-base sm:text-lg">Venue</div>
            </div>
            <div class="mt-4">
              <div class="font-bold text-lg">
                {{ continentalCompetition?.name || '-' }}
              </div>
              <div class="text-sm lg:text-lg">Continental Competition</div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full sm:w-7/10 my-2 sm:my-6 sm:ml-6">
        <div class="h-1/2">
          <h5 class="text-white font-bold pl-2 text-lg">Next Match</h5>
          <div
            v-if="matchesClub.isLoading.value"
            class="skeleton animate-pulse rounded-2xl w-full h-32 sm:h-3/4 my-2 flex flex-row gap-x-4 justify-left px-6"
          ></div>
          <div
            v-else-if="matchesClub.error.value"
            class="bg-base-100/80 rounded-2xl w-full h-40 sm:h-3/4 my-2 px-6 relative"
          >
            <div class="absolute top-1/2 left-1/2 -translate-1/2">
              <ErrorMessage :message="matchesClub.error.value" />
            </div>
          </div>
          <div
            v-else-if="matchesClub.data.value"
            class="bg-base-100/80 rounded-2xl w-full h-3/4 my-2 px-3 lg:px-6 flex flex-row gap-x-4 justify-left items-center overflow-x-auto overflow-y-hidden"
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
            class="skeleton animate-pulse rounded-2xl w-full h-32 sm:h-3/4 my-2 flex flex-row gap-x-4 justify-left px-6"
          ></div>
          <div
            v-else-if="matchesClub.error.value"
            class="bg-base-100/80 rounded-2xl w-full h-40 sm:h-3/4 my-2 px-6 relative"
          >
            <div class="absolute top-1/2 left-1/2 -translate-1/2">
              <ErrorMessage :message="matchesClub.error.value" />
            </div>
          </div>
          <div
            v-else-if="matchesClub.data.value"
            class="bg-base-100/80 rounded-2xl w-full h-3/4 my-2 px-3 lg:px-6 flex flex-row gap-x-4 justify-left items-center overflow-x-auto overflow-y-hidden"
          >
            <div v-for="match in finishedMatches" :key="match.id">
              <MatchTemplate :data="match" :clubId="Number(route.params.id)" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center text-white font-bold py-4 sm:py-8">
      <h3 class="text-2xl sm:text-3xl my-2 sm:my-4">Player & Staff</h3>
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
