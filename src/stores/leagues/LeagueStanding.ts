import { defineStore } from 'pinia'
import axios from "axios"
import BASE_API from '@/BaseApi'
import { ref } from 'vue'

export const useLeagueStandingStore = defineStore("LeagueStanding", () => {
  const data = ref({
    leagueTable: [],
    currentMatchday: 0
  });
  const isLoading = ref(false);
  const error = ref<string | null>(null)

  async function fetchLeagueStanding() {
    try {
      const response = await axios.get(`${BASE_API.BASE_URL}/competitions/PL/standings`, {
        headers: {
          'X-Auth-Token': BASE_API.API_KEY,
        },
      })
  
      data.value.leagueTable = response.data.standings[0].table
      data.value.currentMatchday = response.data.season.currentMatchday
      // console.log(data.value)
    } catch (err) {
      if (err instanceof Error) {
        error.value = 'Failed to fetch data: ' + err.message
        // console.log(error.value)
        //console.log(err)
      }
    } finally {
      isLoading.value = false
    }
  }

  return { data, isLoading, error, fetchLeagueStanding };
})