import { defineStore } from 'pinia'
import { ref } from 'vue'
import { createApi } from "@/api";

export const useLeagueStandingStore = defineStore("LeagueStanding", () => {
  const placeholder = {
    leagueTable: [],
    currentMatchday: 0,
    competition: {
      name: 'League',
      emblem: ''
    },
    area: {
      name: '',
      flag: ''
    },
  }
  const data = ref(placeholder);
  const isLoading = ref(true);
  const error = ref<string | null>(null)

  async function fetchLeagueStanding(leagueCode: string) {
    try {
      data.value = placeholder
      isLoading.value = true
      error.value = null

      const api = createApi();
      
      let apiUrl = `/competitions/${leagueCode}/standings`
      if (import.meta.env.PROD) {
        apiUrl = `/league-standing?league=${leagueCode}`
      }
      const response = await api.get(apiUrl)
  
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