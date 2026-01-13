<script setup lang="ts">
import IconPremierLeague from './icons/leagues/IconPremierLeague.vue'
import IconSerieA from './icons/leagues/IconSerieA.vue'
import IconLaLiga from './icons/leagues/IconLaLiga.vue'
import IconBundesliga from './icons/leagues/IconBundesliga.vue'
import IconSearch from './icons/IconSearch.vue'
// import IconSave from './icons/IconSave.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = (pathName: string) => {
  router.push({ path: pathName })
}
</script>

<template>
  <ul className="menu bg-primary text-white min-h-full w-80 px-4 pt-20 pb-4">
    <!--{/* Sidebar content here */}-->
    <li>
      <label
        @click="navigateTo('/league/PL')"
        htmlFor="my-drawer"
        aria-label="close sidebar"
        class="flex gap-x-4 h-10"
      >
        <IconPremierLeague class="size-6" /> Premier League
      </label>
    </li>
    <li>
      <label
        class="flex gap-x-4 h-10"
        @click="navigateTo('/league/SA')"
        htmlFor="my-drawer"
        aria-label="close sidebar"
      >
        <IconSerieA class="size-6" /> Serie A
      </label>
    </li>
    <li>
      <label
        class="flex gap-x-4 h-10"
        @click="navigateTo('/league/PD')"
        htmlFor="my-drawer"
        aria-label="close sidebar"
      >
        <IconLaLiga class="size-6" /> La Liga
      </label>
    </li>
    <li>
      <label
        to="/league/BL1"
        class="flex gap-x-4 h-10"
        @click="navigateTo('/league/BL1')"
        htmlFor="my-drawer"
        aria-label="close sidebar"
      >
        <IconBundesliga class="size-6" /> Bundesliga
      </label>
    </li>
    <div className="divider"></div>
    <li>
      <label
        class="flex gap-x-4 h-10"
        @click="navigateTo('/club')"
        htmlFor="my-drawer"
        aria-label="close sidebar"
      >
        <IconSearch class="fill-white" /> Search Club
      </label>
    </li>
    <!--
    <li>
      <label
        class="flex gap-x-4 h-10"
        @click="navigateTo('/saved-club')"
        htmlFor="my-drawer"
        aria-label="close sidebar"
      >
        <IconSave class="fill-white" /> Saved Club
      </label>
    </li> -->
  </ul>
</template>
