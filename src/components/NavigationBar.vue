<script setup lang="ts">
import IconPremierLeague from './icons/leagues/IconPremierLeague.vue'
import IconSerieA from './icons/leagues/IconSerieA.vue'
import IconLaLiga from './icons/leagues/IconLaLiga.vue'
import IconBundesliga from './icons/leagues/IconBundesliga.vue'
import IconMenu from './icons/IconMenu.vue'
import IconClose from './icons/IconClose.vue'
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

const isSidebarActive = ref(false)

const toggleSidebarState = () => {
  isSidebarActive.value = !isSidebarActive.value
}

const closeDropdown = (event: Event) => {
  if (event.target instanceof HTMLElement) {
    const detailsElement = event.target.closest('details')
    if (detailsElement) {
      detailsElement.open = false
    }
  }
}
</script>

<template>
  <div
    className="navbar sticky top-0 bg-secondary z-90
  text-white shadow-sm sm:px-8"
  >
    <div className="flex-none sm:hidden">
      <label
        htmlFor="my-drawer"
        aria-label="open sidebar"
        class="btn btn-square btn-ghost"
        @click="toggleSidebarState"
      >
        <IconClose v-if="isSidebarActive" class="swap fill-white size-8" />
        <IconMenu v-else class="swap fill-white size-8" />
      </label>
    </div>
    <div className="flex-1">
      <RouterLink to="/" class="btn btn-ghost text-2xl md:text-3xl font-title">
        CLUB FOOT
      </RouterLink>
    </div>
    <div className="hidden md:block flex-none pr-8">
      <ul className="menu menu-horizontal text-xl px-1 gap-x-8">
        <li>
          <details>
            <summary>League</summary>
            <ul className="bg-secondary w-52 text-base rounded-t-none p-2">
              <li>
                <RouterLink to="/league/PL" @click="closeDropdown" class="flex gap-x-4 h-10">
                  <IconPremierLeague class="size-6" /> Premier League
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/league/SA" @click="closeDropdown" class="flex gap-x-4 h-10">
                  <IconSerieA class="size-6" /> Serie A
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/league/PD" @click="closeDropdown" class="flex gap-x-4 h-10">
                  <IconLaLiga class="size-6" /> La Liga
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/league/BL1" @click="closeDropdown" class="flex gap-x-4 h-10">
                  <IconBundesliga class="size-6" /> Bundesliga
                </RouterLink>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <details>
            <summary>Club</summary>
            <ul className="bg-secondary w-32 rounded-t-none p-2">
              <li>
                <RouterLink to="/club" @click="closeDropdown">Search</RouterLink>
              </li>
              <li>
                <RouterLink to="/saved-club" @click="closeDropdown">Saved</RouterLink>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </div>
  </div>
</template>
