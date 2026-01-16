import { defineStore } from 'pinia'
import { ref } from 'vue'
import { createApi } from "@/api";

export const useLeagueMatchesStore = defineStore("LeagueMatches", () => {
  const data = ref([]);
  const isLoading = ref(true);
  const error = ref<string | null>(null)

  async function fetchLeagueMatches(leagueCode: string, matchday: number) {
    try {
      isLoading.value = true
      error.value = null

      const api = createApi();
      const response = await api.get(`/competitions/${leagueCode}/matches?matchday=${matchday}`)

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