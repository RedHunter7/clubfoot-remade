<script setup lang="ts">
import PlayerCard from '@/components/PlayerCard.vue'
import CoachCard from '@/components/CoachCard.vue'
</script>

<template>
  <div class="w-11/12 mx-auto">
    <div class="flex flex-row h-[calc(100vh_-_72px)]">
      <div class="w-3/10 my-6 bg-base-100/80 rounded-2xl">
        <div class="text-center text-2xl my-6 flex flex-col gap-y-6">
          <img src="@/assets/images/custom-club.svg" class="fill-white size-32 mx-auto" srcset="" />
          <div>
            <div class="font-bold">Machester City</div>
            <div class="text-xl">Premier League</div>
          </div>
          <div class="mt-4">
            <div class="font-bold">Etihad Stadium</div>
            <div class="text-lg">Venue</div>
          </div>
          <div>
            <div class="font-bold">Champions League</div>
            <div class="text-lg">Continental Competition</div>
          </div>
        </div>
      </div>
      <div class="w-7/10 my-6 ml-6">
        <div class="h-1/2">
          <h5 class="text-white font-bold pl-2 text-lg">Next Match</h5>
          <div
            class="bg-base-100/80 rounded-2xl w-full h-3/4 my-2 flex flex-row gap-x-4 justify-left px-6"
          >
            <div class="text-center flex flex-col justify-between my-3 font-bold text-sm">
              <div>Manchester United</div>
              <img
                src="@/assets/images/custom-club.svg"
                class="fill-white size-24 mx-auto"
                srcset=""
              />
              <div>Tomorrow</div>
            </div>
          </div>
        </div>
        <div class="h-1/2">
          <h5 class="text-white font-bold pl-2 text-lg">Match Result</h5>
          <div
            class="bg-base-100/80 rounded-2xl w-full h-3/4 my-2 flex flex-row gap-x-4 justify-left px-6"
          >
            <div class="text-center flex flex-col justify-between my-3 font-bold text-sm">
              <div>Manchester United</div>
              <img
                src="@/assets/images/custom-club.svg"
                class="fill-white size-24 mx-auto"
                srcset=""
              />
              <div>Tomorrow</div>
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
          <CoachCard />
        </div>
        <div>
          <h6 class="mb-2 text-xl">Goalkeeper</h6>
          <div class="mt-4 flex flex-row flex-wrap gap-8 justify-center">
            <PlayerCard />
            <PlayerCard />
            <PlayerCard />
            <PlayerCard />
          </div>
        </div>
        <div>
          <h6 class="mb-2 text-xl">Defender</h6>
          <div class="mt-4 flex flex-row flex-wrap gap-8 justify-center">
            <PlayerCard />
            <PlayerCard />
            <PlayerCard />
            <PlayerCard />
          </div>
        </div>
        <div>
          <h6 class="mb-2 text-xl">Midfield</h6>
          <div class="mt-4 flex flex-row flex-wrap gap-8 justify-center">
            <PlayerCard />
            <PlayerCard />
            <PlayerCard />
            <PlayerCard />
          </div>
        </div>
        <div>
          <h6 class="mb-2 text-xl">Attacker</h6>
          <div class="mt-4 flex flex-row flex-wrap gap-8 justify-center">
            <PlayerCard />
            <PlayerCard />
            <PlayerCard />
            <PlayerCard />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
