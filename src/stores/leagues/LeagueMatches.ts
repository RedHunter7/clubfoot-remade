import { defineStore } from 'pinia'
import axios from "axios"
import BASE_API from '@/BaseApi'
import { ref } from 'vue'

export const useLeagueMatchesStore = defineStore("LeagueMatches", () => {
  const data = ref([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null)

  async function fetchLeagueMatches(leagueCode: string, matchday: number) {
    try {
      const response = await axios.get(`${BASE_API.BASE_URL}/competitions/${leagueCode}/matches?matchday=${matchday}`, {
        headers: {
          'X-Auth-Token': BASE_API.API_KEY,
        },
      })

      data.value = response.data.matches

      console.log(data.value)
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

  return { data, isLoading, error, fetchLeagueMatches };
})