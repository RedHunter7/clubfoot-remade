<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted } from 'vue'

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

const standings = ref<Club[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const token = '2a115aac84e04c66b11d8fc8362d4033'

const fetchData = async () => {
  try {
    const response = await axios.get('https://api.football-data.org/v4/competitions/PL/standings', {
      headers: {
        'X-Auth-Token': token,
        'Content-Type': 'application/json',
      },
    })

    standings.value = response.data
    console.log(response.data)
  } catch (err) {
    if (err instanceof Error) {
      error.value = 'Failed to fetch data: ' + err.message
      console.log(err)
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
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
      <p v-if="loading">Loading users...</p>
      <p v-if="error" class="error">{{ error }}</p>
      <tbody v-if="standings.length" class="text-white">
        <tr
          v-for="club in standings"
          :key="club.position"
          class="odd:bg-base-300/10 hover:text-secondary odd:hover:bg-white even:hover:bg-primary-content"
        >
          <th>{{ club.position }}</th>
          <td>{{ club.team.name }}</td>
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
