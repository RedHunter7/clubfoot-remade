<script setup lang="ts">
import ClubCard from '@/components/cards/ClubCard.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
</script>

<template>
  <div>
    <div class="pt-8 text-center">
      <label className="input input-lg rounded-xl border-none outline-none">
        <IconSearch />
        <input type="search" placeholder="Search" />
      </label>
    </div>
    <div class="flex flex-row justify-center gap-6 mt-8 w-5/6 mx-auto">
      <ClubCard />
      <ClubCard />
    </div>
  </div>
</template>
