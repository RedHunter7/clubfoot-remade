<script setup lang="ts">
import LeagueTable from '@/components/LeagueTable.vue'
</script>

<template>
  <div class="bg-primary">
    <div class="flex flex-row h-[calc(100vh_-_72px)]">
      <div class="w-2/5 my-8">
        <div class="bg-white w-3/4 h-48 rounded-xl mx-auto"></div>
        <div class="text-center text-white text-2xl my-4">
          <div>Defending Champions</div>
          <img src="@/assets/images/custom-club.svg" class="fill-white" srcset="" />
          <div>Liverpool</div>
        </div>
      </div>
      <div class="w-3/5">
        <league-table />
      </div>
    </div>
  </div>
</template>
