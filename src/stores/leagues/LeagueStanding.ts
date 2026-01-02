import { defineStore } from 'pinia'
import axios from "axios"
import BASE_API from '@/BaseApi'
import { ref } from 'vue'

export const useLeagueStandingStore = defineStore("LeagueStanding", () => {
  const data = ref({
    leagueTable: [],
    currentMatchday: 0,
    competition: {
      name: '',
      emblem: ''
    },
    area: {
      name: '',
      flag: ''
    },
  });
  const isLoading = ref(true);
  const error = ref<string | null>(null)

  async function fetchLeagueStanding(leagueCode: string) {
    try {
      const response = await axios.get(`${BASE_API.BASE_URL}/competitions/${leagueCode}/standings`, {
        headers: {
          'X-Auth-Token': BASE_API.API_KEY,
        },
      })
  
      data.value.leagueTable = response.data.standings[0].table
      data.value.currentMatchday = response.data.season.currentMatchday
      data.value.competition = {
        name: response.data.competition.name,
        emblem: response.data.competition.emblem
      }
      data.value.area = {
        name: response.data.area.name,
        flag: response.data.area.flag
      }

      // console.log(data.value)
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message
        // console.log(error.value)
        //console.log(err)
      }
    } finally {
      isLoading.value = false
    }
  }

  return { data, isLoading, error, fetchLeagueStanding };
})