<script setup lang="ts">
import IconPremierLeague from './icons/leagues/IconPremierLeague.vue'
import IconSerieA from './icons/leagues/IconSerieA.vue'
import IconLaLiga from './icons/leagues/IconLaLiga.vue'
import IconBundesliga from './icons/leagues/IconBundesliga.vue'
</script>

<template>
  <div
    className="navbar sticky top-0 bg-secondary z-99
  text-white shadow-sm px-8"
  >
    <div className="flex-1">
      <a className="btn btn-ghost text-3xl font-title">CLUB FOOT</a>
    </div>
    <div className="flex-none pr-8">
      <ul className="menu menu-horizontal text-xl px-1 gap-x-8">
        <li>
          <details>
            <summary>League</summary>
            <ul className="bg-secondary w-52 text-base rounded-t-none p-2">
              <li>
                <a class="flex gap-x-4 h-10">
                  <IconPremierLeague class="size-6" /> Premier League
                </a>
              </li>
              <li>
                <a class="flex gap-x-4 h-10"> <IconSerieA class="size-6" /> Serie A </a>
              </li>
              <li>
                <a class="flex gap-x-4 h-10"> <IconLaLiga class="size-6" /> La Liga </a>
              </li>
              <li>
                <a class="flex gap-x-4 h-10"> <IconBundesliga class="size-6" /> Bundesliga </a>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <details>
            <summary>Club</summary>
            <ul className="bg-secondary w-56 rounded-t-none p-2">
              <li><a>Search CLub</a></li>
              <li><a>Saved CLub</a></li>
            </ul>
          </details>
        </li>
      </ul>
    </div>
  </div>
</template>
