<script setup lang="ts">
const rows = []
for (let index = 0; index < 20; index++) {
  rows[index] = index
}

type Club = {
  position: string
  team: {
    name: string
    shortName: string
  }
  playedGames: number
  won: number
  draw: number
  lost: number
  points: number
  goalDifference: number
}

const props = defineProps({
  data: {
    type: Array<Club>,
    required: true,
  },
})
</script>

<template>
  <div className="overflow-x-scroll h-full">
    <table className="table">
      <thead class="text-white">
        <tr>
          <th>#</th>
          <th>Club</th>
          <th>P</th>
          <th>W</th>
          <th>D</th>
          <th>L</th>
          <th>GD</th>
          <th>PTS</th>
        </tr>
      </thead>
      <tbody class="text-white">
        <tr
          v-for="club in props.data"
          :key="club.position"
          class="odd:bg-base-300/10 hover:text-secondary odd:hover:bg-white even:hover:bg-primary-content"
        >
          <th>{{ club.position }}</th>
          <td>{{ club.team.shortName }}</td>
          <td>{{ club.playedGames }}</td>
          <td>{{ club.won }}</td>
          <td>{{ club.draw }}</td>
          <td>{{ club.lost }}</td>
          <td>{{ club.goalDifference }}</td>
          <td>{{ club.points }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
