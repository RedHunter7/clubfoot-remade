import { defineStore } from 'pinia'
import axios from "axios"
import { ref } from 'vue'

export const useLeagueMatchesStore = defineStore("LeagueMatches", () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  const data = ref([]);
  const isLoading = ref(true);
  const error = ref<string | null>(null)

  async function fetchLeagueMatches(leagueCode: string, matchday: number) {
    try {
      isLoading.value = true
      error.value = null

      const response = await axios.get(`${apiUrl}/competitions/${leagueCode}/matches?matchday=${matchday}`, {
        headers: {
          'X-Auth-Token': apiKey,
        },
      })

      data.value = response.data.matches

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

  return { data, isLoading, error, fetchLeagueMatches };
})